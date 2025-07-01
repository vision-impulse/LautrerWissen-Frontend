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

import { useEffect, useState } from "react";

export function useWikipediaModelDetail<T>(
  fetchFunction: (id: string) => Promise<T>,
  id: string | undefined
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFunction(id);
        setData(result);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("Unknown error"));
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id, fetchFunction]);

  return { data, isLoading, error };
}
