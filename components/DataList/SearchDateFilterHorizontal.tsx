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

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
}

const SearchDateFilterHorizontal: React.FC<Props> = ({
  searchText,
  setSearchText,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  // Start with filters hidden
  const [expanded, setExpanded] = useState(false);

  const resetFilters = () => {
    setSearchText("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-gray-100 px-6 py-3 border border-gray-300 rounded-lg shadow-md mb-3">
      {/* Expandable Header */}
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="font-semibold text-gray-600">Ergebnisse filtern</h2>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {/* Filter Inputs */}
      {expanded && (
        <div className="flex flex-col gap-3">
          {/* Combined Row for search + date filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
            

          {/* Search Input */}
            <div className="flex flex-col w-full sm:w-[40%]">
              <label htmlFor="search" className="text-gray-600 font-semibold text-sm mb-1 ml-1">
                Suchen
              </label>
              <input
                id="search"
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Begriff suchen..."
                className="border border-gray-300 rounded px-3 py-2 text-sm h-[35px]"
              />
            </div>

            {/* Date Inputs with placeholders instead of labels */}
            <div className="flex md:flex-row flex-col gap-4 w-full sm:w-[50%] justify-end">
              <div className="flex flex-col w-full sm:w-auto">
                <label htmlFor="search" className="text-gray-600 font-semibold text-sm mb-1 ml-1">
                  Von
                </label>

                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Von"
                  className="border border-gray-300 rounded px-3 py-2 text-sm h-[35px]"
                />
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <label htmlFor="search" className="text-gray-600 font-semibold text-sm mb-1 ml-1">
                  Bis
                </label>

                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="Bis asdasd"
                  className="border border-gray-300 rounded px-3 py-2 text-sm h-[35px]"
                />
              </div>
            </div>
          </div>

          {/* Reset Link */}
          <div className="text-sm mt-1 text-main-light-dark hover:underline cursor-pointer w-fit" onClick={resetFilters}>
            Filtereinstellungen verwerfen
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDateFilterHorizontal;
