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

import { useState, useEffect } from 'react';

export type PaginationParams = {
  page?: number;
  search?: string;
  category?: string[];
  startDate?: string;
  endDate?: string;
};

type FetchFunction<T> = (params: any) => Promise<{ results: T[]; count: number; next: string | null; previous: string | null }>;

export const usePaginatedData = <T>(params: any, fetchFunction: FetchFunction<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [total, setTotal] = useState<number>(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchFunction(params);
        setData(res.results || []);
        setTotal(res.count || 0);
        setNextPage(res.next || null);
        setPrevPage(res.previous || null);
        setError(null);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    params.page,
    params.search,
    JSON.stringify(params.category),
    params.startDate,
    params.endDate,
  ]);

  return { data, isLoading, error, total, nextPage, prevPage };
};
