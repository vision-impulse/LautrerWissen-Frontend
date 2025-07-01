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

import React, { useEffect, useRef } from 'react';

const partyColors: Record<string, string> = {
  SPD: '#E3000F',
  CDU: '#000000',
  GRÜNE: '#64A12D',
  AfD: '#009EE0',
  FDP: '#FFED00',
  'Die Linke': '#BE3075',
  'Tierschutzpartei': '#5A5A5A',
  'Die PARTEI': '#A11035',
  Volt: '#502379',
  ÖDP: '#E37D00',
  MLPD: '#990000',
  'BÜNDNIS DEUTSCHLAND': '#123456',
  BSW: '#FF6200',
  'FREIE WÄHLER': '#1E73BE',
};

type PartyResult = {
    Name: string;
    Direktstimme: string | null;
    Zweitstimme: string | null;
  };
  
  const summaryNames = new Set([
    'Wahlberechtigte gesamt',
    'Waehler gesamt',
    'Ungueltige Stimmen',
    'Gueltige Stimmen',
  ]);


  export default function ElectionTable({ data }: { data: PartyResult[] }) {
    const validVoters = data.find((d) => d.Name === 'Wahlberechtigte gesamt');
    const totalVoters = Number(validVoters?.Direktstimme ?? 0);
  
    const mainResults = data.filter((d) => !summaryNames.has(d.Name));
    const summaryResults = data.filter((d) => summaryNames.has(d.Name));
  
    const format = (value: string | null) =>
      value === null || value === '0' ? '-' : Number(value).toLocaleString('de-DE');
  
    const percent = (value: string | null, total: number) => {
      const n = Number(value);
      if (!value || isNaN(n) || n === 0 || total === 0) return '-';
      return (n / total * 100).toFixed(1).replace('.', ',') + '%';
    };
  
    const renderTable = (tableData: PartyResult[], showCircle: boolean, totalVoters: number) => (
      <table className="min-w-full table-fixed text-sm divide-y divide-gray-300 dark:divide-gray-600">
        <colgroup>
          <col style={{ width: '35%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            {showCircle ? (
              <th rowSpan={2} className="px-2 py-2 text-left align-middle">Partei</th>
            ) : (
              <th rowSpan={2} className="px-2 py-2 text-left align-middle">Wahlbeteiligung</th>
            )}
            <th colSpan={2} className="px-2 py-1 text-center">Erststimme</th>
            <th colSpan={2} className="px-2 py-1 text-center">Zweitstimme</th>
          </tr>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="px-2 py-1 text-right">#</th>
            <th className="px-2 py-1 text-right">%</th>
            <th className="px-2 py-1 text-right">#</th>
            <th className="px-2 py-1 text-right">%</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((d) => (
            <tr key={d.Name} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-2 py-1">
                <div className="flex items-center gap-2">
                  {showCircle ? (
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: partyColors[d.Name] || '#ccc' }}
                    />
                  ) : (
                    <span className="inline-block w-0 h-3 rounded-full invisible" />
                  )}
                  <span>{d.Name}</span>
                </div>
              </td>
              <td className="px-2 py-1 text-right">{format(d.Direktstimme)}</td>
              <td className="px-2 py-1 text-right">{percent(d.Direktstimme, totalVoters)}</td>
              <td className="px-2 py-1 text-right">{format(d.Zweitstimme)}</td>
              <td className="px-2 py-1 text-right">{percent(d.Zweitstimme, totalVoters)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  
    return (
      <div className="space-y-6 overflow-x-auto">
        <div>{renderTable(mainResults, true, totalVoters)}</div>
        <hr className="my-4 border-t border-gray-400" />
        <div>{renderTable(summaryResults, false, totalVoters)}</div>
      </div>
    );
  }
