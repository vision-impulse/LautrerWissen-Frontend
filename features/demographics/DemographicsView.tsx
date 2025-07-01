// features/demographics/DemographicsView.tsx
'use client';

import Section from '@/components/Tiles/Box';
import React, { useState } from 'react';
import { useDistricts, useDemographics } from '@/hooks/api/useDemographics';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { DemographicDataItem } from '@/types/api';


const DemographicsView: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<number>(1);
  const { districts } = useDistricts();
  const { data, loading } = useDemographics(selectedDistrictId);

  const groupedData = data.reduce<Record<string, Record<string, number>>>((acc, item) => {
    if (!acc[item.age_group]) {
      acc[item.age_group] = { männlich: 0, weiblich: 0, divers: 0 };
    }
    if (item.gender !== 'ohne Angabe') {
      acc[item.age_group][item.gender] = item.number;
    }
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map((ageGroup) => ({
    ageGroup: ageGroup.replace(/\.0/g, ''),
    männlich: groupedData[ageGroup]['männlich'] || 0,
    weiblich: groupedData[ageGroup]['weiblich'] || 0,
    divers: groupedData[ageGroup]['divers'] || 0,
  }));

  const tableData: Record<
    string,
    { männlich: number; weiblich: number; divers: number; ohneAngabe: number; gesamt: number }
  > = {};
  data.forEach((item) => {
    const ageGroup = item.age_group.replace(/\.0/g, '');
    if (!tableData[ageGroup]) {
      tableData[ageGroup] = { männlich: 0, weiblich: 0, divers: 0, ohneAngabe: 0, gesamt: 0 };
    }
    if (item.gender === 'männlich') {
      tableData[ageGroup].männlich = item.number;
    } else if (item.gender === 'weiblich') {
      tableData[ageGroup].weiblich = item.number;
    } else if (item.gender === 'divers') {
      tableData[ageGroup].divers = item.number;
    } else if (item.gender === 'ohne Angabe') {
      tableData[ageGroup].ohneAngabe = item.number;
    }
    tableData[ageGroup].gesamt =
      tableData[ageGroup].männlich +
      tableData[ageGroup].weiblich +
      tableData[ageGroup].divers +
      tableData[ageGroup].ohneAngabe;
  });

  return (
    <Section
      title="Übersicht der Demographie in Kaiserslautern"
      footer_date_title=""
      footer_source_title="Stadtverwaltung Kaiserslautern (Statistik)"
    >
      <div className="mt-4 mb-4">
        <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700">
          Stadtteil auswählen:
        </label>
        <select
          id="districtSelect"
          className="mt-0 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none text-sm"
          value={selectedDistrictId}
          onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
        >
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-3 pb-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
          <h2 className="text-xl text-main-heading font-semibold mb-0">
            Verteilung der Altersklassen nach Geschlecht
          </h2>
          <h3 className="text-sm mb-4">{loading ? 'Lade Daten...' : ''}</h3>
          <ResponsiveContainer width="95%" height={350}>
            <BarChart
              data={chartData.sort(
                (a, b) => parseInt(a.ageGroup.split('-')[0]) - parseInt(b.ageGroup.split('-')[0])
              )}
              margin={{ top: 10, right: 30, bottom: 20, left: 40 }}
            >
              <CartesianGrid strokeDasharray="2 4" vertical={false} />
              <XAxis
                dataKey="ageGroup"
                label={{ value: 'Altersklasse', position: 'insideBottom', offset: -10, style: { fontSize: '1.05rem' } }}
              />
              <YAxis
                label={{ value: 'Anzahl', angle: -90, position: 'insideLeft', offset: -5, style: { fontSize: '1.05rem' } }}
              />
              <Tooltip
                contentStyle={{ fontSize: '0.75rem', padding: '4px 8px' }}
                formatter={(value: number, name: string) => [value, name.charAt(0).toUpperCase() + name.slice(1)]}
                labelFormatter={(label: string) => `Altersklasse: ${label}`}
              />
              <Legend
                verticalAlign="top"
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value: string) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <Bar dataKey="männlich" stackId="a" fill="#8884d8" />
              <Bar dataKey="weiblich" stackId="b" fill="#82ca9d" />
              <Bar dataKey="divers" stackId="c" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-3 pb-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
          <h2 className="text-xl text-main-heading font-semibold mb-0">
            Verteilung der Altersgruppen nach Geschlecht
          </h2>
          <table className="min-w-full bg-white border border-gray-300 text-sm mt-2">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Altersklasse (Jahre)</th>
                <th className="border px-2 py-1">Männlich</th>
                <th className="border px-2 py-1">Weiblich</th>
                <th className="border px-2 py-1">Divers</th>
                <th className="border px-2 py-1">Ohne Angabe</th>
                <th className="border px-2 py-1">Gesamt</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(tableData)
                .sort((a, b) => parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]))
                .map((ageGroup) => (
                  <tr key={ageGroup}>
                    <td className="border px-2 py-1">{ageGroup}</td>
                    <td className="border px-2 py-1">{tableData[ageGroup].männlich}</td>
                    <td className="border px-2 py-1">{tableData[ageGroup].weiblich}</td>
                    <td className="border px-2 py-1">{tableData[ageGroup].divers}</td>
                    <td className="border px-2 py-1">{tableData[ageGroup].ohneAngabe}</td>
                    <td className="border px-2 py-1">{tableData[ageGroup].gesamt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

export default DemographicsView;
