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
import { getAllElections } from "@/api/elections";
import { ElectionApiResponse } from "@/types/api";

export const useFirstElection = () => {
  const [firstElectionId, setFirstElectionId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const elections: ElectionApiResponse[] = await getAllElections();
        if (elections.length > 0) {
          setFirstElectionId(elections[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch first election:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { firstElectionId, loading, error };
};