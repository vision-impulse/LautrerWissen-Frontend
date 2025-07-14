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

import { useEffect, useState } from 'react';
import { getDistricts, getDemographicData } from '@/api/demographics';
import { DemographicDataItem, DistrictAPIResponse, DemographicApiResponse } from '@/types/api';

export function useDistricts() {
  const [districts, setDistricts] = useState<DistrictAPIResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDistricts();
        const filteredData = data.filter(district => district.name !== 'None');
        setDistricts(filteredData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { districts, loading };
}


export function useDemographics(districtId?: number) {
  const [data, setData] = useState<DemographicDataItem[]>([]);
  const [loading, setLoading] = useState(true);

  function extractStartAge(ageGroup: string): number {
    const match = ageGroup.match(/\d+/); // get first number
    return match ? parseInt(match[0], 10) : Infinity;
  }

  useEffect(() => {
    if (districtId === undefined) {
      setData([]);
      setLoading(false);
      return;
    }

    async function fetchData() {     
      setLoading(true);
      try {
        const response: DemographicApiResponse = await getDemographicData(districtId);

        const sortedResults = response.results.sort((a, b) => {
          return extractStartAge(a.age_group) - extractStartAge(b.age_group);
        });

        setData(sortedResults);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (districtId) {
      fetchData();
    }
  }, [districtId]);

  return { data, loading };
}
