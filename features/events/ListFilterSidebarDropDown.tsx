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

import React from "react";

interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  dataSource: "leisure" | "wga";
  setDataSource: React.Dispatch<React.SetStateAction<"leisure" | "wga">>;
}

const EventFilterSidebar: React.FC<Props> = ({
  searchText,
  setSearchText,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categories,
  selectedCategories,
  setSelectedCategories,
  toggleCategory,
  dataSource,
  setDataSource,
}) => {
  return (
    <div className="bg-gray-100 p-3 border border-gray-300 rounded-lg shadow-md">
      {/* Data Source Selector */}
      <div className="flex flex-col mb-3">
        <label htmlFor="data-source" className="text-gray-600 font-semibold text-sm text-left mb-1">
          Kalender
        </label>
        <select className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value as "leisure" | "wga")}
        >
          <option value="leisure" className="border border-gray-300 rounded px-3 py-1 text-sm">Stadt KL</option>
          <option value="wga" className="border border-gray-300 rounded px-3 py-1 text-sm">Was geht app?</option>
        </select>
      </div>

      {/* Search Section */}
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex flex-col">
          <label htmlFor="search" className="text-gray-600 font-semibold text-sm text-left mb-1">
            Suchen
          </label>
          <input
            id="search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Begriff suchen..."
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* Date Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="start-date" className="text-gray-600 font-semibold text-sm text-left mb-1">
            Von
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="end-date" className="text-gray-600 font-semibold text-sm text-left mb-1">
            Bis
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex flex-col mt-3">
        <label className="text-gray-600 font-semibold text-sm text-left mb-1">Kategorien</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full border text-sm ${selectedCategories.includes(category)
                  ? "bg-main-light-dark text-white"
                  : "bg-gray-200 text-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <div className="flex flex-col mt-3">
        <label className="text-gray-600 font-semibold text-sm text-left mb-0">
          Sucheinstellungen verwerfen
        </label>
        <button
          onClick={() => {
            setSearchText("");
            setSelectedCategories([]);
            setStartDate("");
            setEndDate("");
          }}
          className="mt-2 px-3 py-1 rounded-full border bg-gray-200 text-text-gray-700 text-sm hover:bg-main-light-dark hover:text-white transition duration-200"
        >
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
};

export default EventFilterSidebar;
