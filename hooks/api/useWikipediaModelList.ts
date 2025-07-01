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

export function useWikipediaModelList<T>(fetchFunction: () => Promise<T>) {
  const [objects, setObjects] = useState<T | null>(null);
  const [isLoadingObjects, setIsLoadingObjects] = useState(true);
  const [errorObjects, setErrorObjects] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoadingObjects(true);
      try {
        const result = await fetchFunction();
        if (isMounted) setObjects(result);
      } catch (e) {
        if (isMounted) {
          console.error(e);
          setErrorObjects(e instanceof Error ? e : new Error("Unknown error"));
        }
      } finally {
        if (isMounted) setIsLoadingObjects(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependencies: runs only once

  return { objects, isLoadingObjects, errorObjects };
}
