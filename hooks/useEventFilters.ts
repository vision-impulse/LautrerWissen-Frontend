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

import { useState, useEffect, useMemo } from 'react';

export const useEventFilters = (initialCategories: string[] = []) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, startDate, endDate, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1); // Reset page to 1 when categories change
  };

  const searchParams = useMemo(
    () => ({
      page: currentPage,
      search: searchText,
      category: selectedCategories,
      startDate,
      endDate,
    }),
    [currentPage, searchText, selectedCategories, startDate, endDate]
  );

  return {
    searchText,
    setSearchText,
    selectedCategories,
    setSelectedCategories,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    currentPage,
    setCurrentPage,
    toggleCategory,
    searchParams,
  };
};
