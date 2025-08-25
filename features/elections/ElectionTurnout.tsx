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
import CountUp from 'react-countup';

type PartyResult = {
  Name: string;
  Direktstimme: string | null;
  Zweitstimme: string | null;
};

export default function ElectionTurnout({ data }: { data: PartyResult[] }) {
  const validVoters = data.find((d) => d.Name === 'Wahlberechtigte gesamt');
  const totalVoters = Number(validVoters?.Direktstimme ?? 0);

  const actualVoters = data.find((d) => d.Name === 'Waehler gesamt');
  const actualTotalVoters = Number(actualVoters?.Direktstimme ?? 0);

  const percent = (value: number | null, total: number) => {
    if (!value || isNaN(value) || value === 0 || total === 0) return 0;
    return (value / total * 100);
  };

  const turnout = percent(actualTotalVoters, totalVoters);

  return (
    <div className="text-lg space-y-6 overflow-x-auto">
      <div className='font-semibold '>
        <div>
          Wahlbeteiligung: {turnout === 0 ? "-" : (
            <CountUp end={turnout} duration={1} decimals={1} suffix="%" />
          )}
        </div>
      </div>
    </div>
  );
}
