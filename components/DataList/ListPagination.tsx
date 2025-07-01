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

interface PaginationBarProps {
  currentPage: number;
  totalEvents: number;
  nextPage: string | null;
  prevPage: string | null;
  setCurrentPage: (page: number) => void;
  itemsPerPage?: number;
}

const PaginationBar: React.FC<PaginationBarProps> = ({
  currentPage,
  totalEvents,
  nextPage,
  prevPage,
  setCurrentPage,
  itemsPerPage = 50,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalEvents / itemsPerPage));

  return (
    <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-gray-200">
      <div className="text-gray-700">
        {totalEvents} Einträge – Seite {currentPage} von {totalPages}
      </div>

      <div className="flex gap-2">
        <button
          disabled={!prevPage}
          onClick={() => prevPage && setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Vorherige
        </button>
        <button
          disabled={!nextPage}
          onClick={() => nextPage && setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Nächste
        </button>
      </div>
    </div>
  );
};

export default PaginationBar;
