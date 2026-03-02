/**
 * @file This file is part of LautrerWissen
 * @author Benjamin Bischke
 * @copyright 2025 Vision Impulse GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

'use client';

import Section from '@/components/Tiles/Box';
import React, { useState, useEffect, useMemo } from 'react';
import { useDistricts, useDemographics } from '@/hooks/api/useDemographics';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Spinner } from '@/components/Elements/Spinner'

import { useSearchParams } from 'next/navigation';
import BreadcrumbsBar from "@/components/Layout/BreadcrumbsBar";
import { getNormalizedGeoJson } from "@/features/districts/geojson";

const geojsonData = getNormalizedGeoJson();

const normalizeDistrictName = (name: string) =>
  name
    .replace(/\s*\/\s*/g, "/") // remove spaces around "/"
    .trim();

const DemographicsView: React.FC = () => {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string | null>(null);
  const { districts } = useDistricts();
  const searchParams = useSearchParams();

  const districtParam = searchParams?.get("district_id") ?? null;
  const feature = geojsonData.features.find(
    (f) => districtParam !== null && districtParam === f.properties.ID
  );
  const districtName = feature?.properties?.Name ?? '';
  const breadcrumbs = districtName
    ? [
      { label: 'Startseite', href: '/' },
      { label: districtName, href: '/districts?ID=' + districtParam },
      { label: 'Demografie', href: '' },
    ]
    : [
      { label: 'Startseite', href: '/' },
      { label: 'Demografie', href: '' },
    ];

  // Determine the correct district ID
  useEffect(() => {
    if (districts.length === 0) return;
    if (!districtParam){
      setSelectedDistrictId("00");
      return
    }
  
    const match = districts.find(
      (entry) =>
        normalizeDistrictName(entry.id) ===
        normalizeDistrictName(districtParam)
    );
    if (match) {
      setSelectedDistrictId(match.id);
    } else {
      setSelectedDistrictId("00"); // fallback
    }
  }, [districtParam, districts]);

  // Only load data if we have a valid district ID
  const { data, loading } = useDemographics(
    selectedDistrictId !== null ? selectedDistrictId : undefined
  );

  // Prepare chart + table data only if data exists
  const chartData = useMemo(() => {
    if (!data) return [];

    const groupedData = data.reduce<
      Record<string, { Männlich: number; Weiblich: number }>
    >((acc, item) => {
      const ageGroup = item.age_group
        .replace(/\.0/g, '')
        .replace(/^von\s+/i, '')
        .replace(/\s+bis\s+unter\s+/i, ' < ')
        .trim();

      if (!acc[ageGroup]) {
        acc[ageGroup] = { Männlich: 0, Weiblich: 0 };
      }
      acc[ageGroup][item.gender] += item.population_count;
      return acc;
    }, {});

    return Object.keys(groupedData).map((ageGroup) => ({
      ageGroup: ageGroup.replace(/\.0/g, ''),
      Männlich: groupedData[ageGroup].Männlich,
      Weiblich: groupedData[ageGroup].Weiblich,
    }));
  }, [data]);

  const remark = useMemo(() => {
    if (!data) return "";
    if (data.length > 0) {
      return data[0].remark
    }
  }, [data]);

  const tableData = useMemo(() => {
    if (!data) return {};

    const result: Record<
      string,
      { männlich: number; weiblich: number; gesamt: number }
    > = {};

    data.forEach((item) => {
      const ageGroup = item.age_group.replace(/\.0/g, '');

      if (!result[ageGroup]) {
        result[ageGroup] = {
          männlich: 0,
          weiblich: 0,
          gesamt: 0,
        };
      }

      if (item.gender === 'Männlich') {
        result[ageGroup].männlich += item.population_count;
      } else if (item.gender === 'Weiblich') {
        result[ageGroup].weiblich += item.population_count;
      }
      result[ageGroup].gesamt =
        result[ageGroup].männlich + result[ageGroup].weiblich;
    });

    const totalRow = Object.values(result).reduce(
      (acc, curr) => {
        acc.männlich += curr.männlich;
        acc.weiblich += curr.weiblich;
        acc.gesamt += curr.gesamt;
        return acc;
      },
      { männlich: 0, weiblich: 0, gesamt: 0 }
    );

    result['Gesamt'] = totalRow;
    return result;
  }, [data]);

  return (
    <div className='grow'>
      <BreadcrumbsBar breadcrumbs={breadcrumbs} />

      <main className="grow max-w-screen-xl mx-auto">

        <div className="px-4 sm:px-6 lg:px-4 w-full max-w-9xl mx-auto">
          <div className="mt-6 mb-3">
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
                  onChange={(e) => setSelectedDistrictId(e.target.value)}
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
                  <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
                    <h2 className="text-xl text-main-heading font-semibold mb-0">
                      Verteilung der Altersklassen nach Geschlecht
                    </h2>
                    {loading && <div className="p-4"><Spinner /></div>}
                    <ResponsiveContainer width="95%" height={350}>
                      
                      <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 20, bottom: 20, left: 30 }}
                      >
                        <CartesianGrid strokeDasharray="2 4" vertical={false} />
                        <XAxis
                          dataKey="ageGroup"
                          tick={{ fontSize: 13 }}
                          label={{ value: 'Altersklasse', position: 'insideBottom', offset: -15, style: { fontSize: 15 } }}
                        />
                        <YAxis
                          label={{ value: 'Anzahl', angle: -90, position: 'insideLeft', offset: -5, style: { fontSize: 15 }}}
                        />
                        <Tooltip
                          formatter={(value, name) => [
                            value ?? 0,
                            name,
                          ]}
                          labelFormatter={(label) => `Altersklasse: ${label}`}
                          contentStyle={{ fontSize: '13px' }}   // whole tooltip
                          labelStyle={{ fontSize: '13px', fontWeight: 600 }} // top label
                          itemStyle={{ fontSize: '13px' }}  // entries inside tooltip
                          />
                        <Legend verticalAlign="top" wrapperStyle={{ paddingTop: '10px', fontSize: '14px'  }} />
                        <Bar dataKey="Männlich" stackId="a" fill="#001F3F" />
                        <Bar dataKey="Weiblich" stackId="b" fill="#003797" />
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
                  <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
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
                                <td className="border px-2 py-1">{tableData[ageGroup].gesamt}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>                    
                        {remark?.trim() && (
                          <div className="text-sm pt-3">
                            Bemerkung: {remark}
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              )}
            </Section>
          </div>
        </div>
      </main>
    </div>

  );
};

export default DemographicsView;
