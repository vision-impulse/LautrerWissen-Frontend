// features/demographics/DemographicsView.tsx
'use client';

import Section from '@/components/Tiles/Box';
import React, { useState, useEffect, useMemo } from 'react';
import { useDistricts, useDemographics } from '@/hooks/api/useDemographics';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Spinner } from '@/components/Elements/Spinner'

import { useSearchParams } from 'next/navigation';
import geojsonData from '@/assets/polygons.json';



const DemographicsView: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(null);
  const { districts } = useDistricts();
  const searchParams = useSearchParams();

  const districtParam = searchParams.get('district_id');
  const feature = geojsonData.features.find(
    (f) => districtParam !== null && parseInt(districtParam) === f.properties.ID
  );
  const districtName = feature?.properties?.Name.replace(/\s+/g, '')  ?? '';

  // Determine the correct district ID from name or default
  useEffect(() => {
    if (districts.length === 0) return;

    const matched = districtName
      ? districts.find((d) => d.name === districtName)
      : null;

    if (matched) {
      setSelectedDistrictId(matched.id);
    } else {
      setSelectedDistrictId(1); // fallback
    }
  }, [districtName, districts]);

  // Only load data if we have a valid district ID
  const { data, loading } = useDemographics(
    selectedDistrictId !== null ? selectedDistrictId : undefined
  );

  // Prepare chart + table data only if data exists
  const chartData = useMemo(() => {
    if (!data) return [];

    const groupedData = data.reduce<Record<string, Record<string, number>>>((acc, item) => {
      if (!acc[item.age_group]) {
        acc[item.age_group] = { männlich: 0, weiblich: 0, divers: 0 };
      }
      if (item.gender !== 'ohne Angabe') {
        acc[item.age_group][item.gender] = item.number;
      }
      return acc;
    }, {});

    return Object.keys(groupedData).map((ageGroup) => ({
      ageGroup: ageGroup.replace(/\.0/g, ''),
      männlich: groupedData[ageGroup]['männlich'] || 0,
      weiblich: groupedData[ageGroup]['weiblich'] || 0,
      divers: groupedData[ageGroup]['divers'] || 0,
    }));
  }, [data]);

  const tableData = useMemo(() => {
    if (!data) return {};

    const result: Record<
      string,
      { männlich: number; weiblich: number; divers: number; ohneAngabe: number; gesamt: number }
    > = {};

    data.forEach((item) => {
      const ageGroup = item.age_group.replace(/\.0/g, '');
      if (!result[ageGroup]) {
        result[ageGroup] = {
          männlich: 0,
          weiblich: 0,
          divers: 0,
          ohneAngabe: 0,
          gesamt: 0,
        };
      }

      if (item.gender === 'männlich') result[ageGroup].männlich = item.number;
      else if (item.gender === 'weiblich') result[ageGroup].weiblich = item.number;
      else if (item.gender === 'divers') result[ageGroup].divers = item.number;
      else if (item.gender === 'ohne Angabe') result[ageGroup].ohneAngabe = item.number;

      result[ageGroup].gesamt =
        result[ageGroup].männlich +
        result[ageGroup].weiblich +
        result[ageGroup].divers +
        result[ageGroup].ohneAngabe;
    });

    return result;
  }, [data]);

  return (
    <Section
      title="Übersicht der Demographie in Kaiserslautern"
      footer_date_title=""
      footer_source_title="Stadtverwaltung Kaiserslautern (Statistik) "
    >
      {/* District Selection */}
      <div className="mt-4 mb-4">
        <label htmlFor="districtSelect" className="block text-sm font-medium text-gray-700">
          Stadtteil auswählen: 
        </label>
        <select
          id="districtSelect"
          className="mt-0 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none text-sm"
          value={selectedDistrictId ?? ''}
          onChange={(e) => setSelectedDistrictId(Number(e.target.value))}
        >
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Section */}
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-3 pb-3">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
            <h2 className="text-xl text-main-heading font-semibold mb-0">
              Verteilung der Altersklassen nach Geschlecht
            </h2>
            {loading && <div className="p-4"><Spinner /></div>}
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
                  label={{ value: 'Altersklasse', position: 'insideBottom', offset: -10 }}
                />
                <YAxis
                  label={{ value: 'Anzahl', angle: -90, position: 'insideLeft', offset: -5 }}
                />
                <Tooltip
                  formatter={(value: number, name: string) => [value, name]}
                  labelFormatter={(label: string) => `Altersklasse: ${label}`}
                />
                <Legend verticalAlign="top" wrapperStyle={{ paddingTop: '10px' }} />
                <Bar dataKey="männlich" stackId="a" fill="#8884d8" />
                <Bar dataKey="weiblich" stackId="b" fill="#82ca9d" />
                <Bar dataKey="divers" stackId="c" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-600 mt-4">Keine Daten verfügbar.</p>
      )}

      {/* Table Section */}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-3 pb-3">
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200">
            <h2 className="text-xl text-main-heading font-semibold mb-0">
              Verteilung der Altersgruppen nach Geschlecht
            </h2>
            <div className="overflow-x-auto mt-2">
              <table className="w-full min-w-max bg-white border border-gray-300 text-sm">
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
        </div>
      )}
    </Section>
  );
};

export default DemographicsView;
