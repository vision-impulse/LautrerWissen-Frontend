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

interface ContentProps {
  searchText: string;
  setSearchText: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  toggleCategory: (c: string) => void;
  dataSource: "leisure" | "wga";
  setDataSource: (v: "leisure" | "wga") => void;
}

export const EventFilterSidebarContent: React.FC<ContentProps> = ({
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
    <div className="space-y-3">
      {/* Data Source */}
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold text-sm mb-1">
          Kalender
        </label>
        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm"
          value={dataSource}
          onChange={(e) =>
            setDataSource(e.target.value as "leisure" | "wga")
          }
        >
          <option value="leisure">Stadt KL</option>
          <option value="wga">Was geht app?</option>
        </select>
      </div>

      {/* Search */}
      <div className="flex flex-col">
        <label className="text-gray-600 font-semibold text-sm mb-1">
          Suchen
        </label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Begriff suchen..."
          className="border border-gray-300 rounded px-3 py-1 text-sm"
        />
      </div>

      {/* Dates */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold text-sm mb-1">
            Von
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-semibold text-sm mb-1">
            Bis
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-gray-600 font-semibold text-sm mb-1 block">
          Kategorien
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full border text-sm ${
                selectedCategories.includes(category)
                  ? "bg-main-dark text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <div>
        <button
          onClick={() => {
            setSearchText("");
            setSelectedCategories([]);
            setStartDate("");
            setEndDate("");
          }}
          className="mt-2 px-3 py-1 rounded-full border bg-gray-200 text-sm hover:bg-main-light-dark hover:text-white transition"
        >
          Filter zurücksetzen
        </button>
      </div>
    </div>
  );
};
