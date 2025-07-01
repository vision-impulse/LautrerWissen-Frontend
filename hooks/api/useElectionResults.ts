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

import { useState, useEffect } from "react";
import { getElectionResults } from "@/api/elections";
import { ElectionApiResponse } from "@/types/api";

export const useElectionResults = (electionId?: number) => {
  const [data, setData] = useState<ElectionApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!electionId) return; 

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getElectionResults(electionId);
        setData(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching election results:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [electionId]);

  return { data, isLoading, error };
};