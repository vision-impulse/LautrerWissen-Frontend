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

import * as d3 from 'd3';
import React, { useEffect, useRef } from 'react';

export type DataPoint = {
  partei: string;
  share: number;
};

const partyColors: Record<string, string> = {
  SPD: '#E3000F',
  CDU: '#000000',
  GRÜNE: '#64A12D',
  AfD: '#009EE0',
  FDP: '#FFED00',
  FWG: '#1E73BE',
  'DIE LINKE': '#BE3075',
  BSW: '#FF6200',
  Tierschutzpartei: '#5A5A5A',
};

// Convert and normalize to percentages, combine < 2% into "Sonstige"
function normalizeData(raw: Record<string, string>): DataPoint[] {
  const parsed = Object.entries(raw).map(([partei, value]) => ({
    partei,
    value: parseFloat(value),
  }));
  const total = d3.sum(parsed, d => d.value);

  const processed: DataPoint[] = [];
  let sonstigeTotal = 0;

  for (const { partei, value } of parsed) {
    const share = (value / total) * 100;
    if (share < 2) {
      sonstigeTotal += value;
    } else {
      processed.push({ partei, share });
    }
  }

  if (sonstigeTotal > 0) {
    processed.push({
      partei: 'Sonstige',
      share: (sonstigeTotal / total) * 100,
    });
  }

  return processed
}
import { Cell } from 'recharts';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

interface VerticalBarChartProps {
  data: Record<string, string>; // same as original prop
}

const VerticalBarChartRecharts: React.FC<VerticalBarChartProps> = ({ data }) => {
  const convertedData: DataPoint[] = normalizeData(data);

  const adjustedMax =
    Math.ceil((Math.max(...convertedData.map((d) => d.share)) || 0) * 1.04);

  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart
        data={convertedData}
        margin={{ top: 20, right: 15, bottom: 50, left: 0 }}
      >
        {/* Horizontal grid lines */}
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />

        {/* X Axis */}
        <XAxis
          dataKey="partei"
          tick={{ fontSize: 11 }}
          interval={0} // show all labels
          angle={-45} // tilt for better visibility
          textAnchor="end"
        />

        {/* Y Axis */}
        <YAxis
          domain={[0, adjustedMax]}
          ticks={[0, adjustedMax / 4, adjustedMax / 2, (3 * adjustedMax) / 4, adjustedMax]}
          tickFormatter={(value) => `${value}%`}
          tick={{ fontSize: 11 }}
        />

        {/* Tooltip */}
        <Tooltip
          formatter={(value: number) => `${value.toFixed(1).replace('.', ',')}%`}
          labelFormatter={(label: string) => `Partei: ${label}`}
          contentStyle={{
            fontSize: '12px',
            background: '#fff',
            border: '1px solid #ccc',
            padding: '4px 10px',
          }}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />

        {/* Bars */}
        <Bar
          dataKey="share"
          isAnimationActive
          animationDuration={1500}
          radius={[2, 4, 0, 0]}
        >
          {convertedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={partyColors[entry.partei] || '#888'}
            />
          ))}

          <LabelList
            dataKey="share"
            position="top"
            formatter={(value: number) => `${value.toFixed(1).replace('.', ',')}%`}
            style={{ fontSize: '10px' }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VerticalBarChartRecharts;