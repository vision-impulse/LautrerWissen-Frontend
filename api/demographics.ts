
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

import { DemographicApiResponse, DistrictAPIResponse } from '@/types/api';
import publicConfig from '@/config/public';


export async function getDistricts(): Promise<DistrictAPIResponse[]> {
  const response = await fetch(`${publicConfig.apiBackend}/demographics/districts/`);
  if (!response.ok) {
    throw new Error('Failed to fetch districts');
  }
  const json = await response.json();
  return json.districts;
}

export async function getDemographicData(districtId?: number): Promise<DemographicApiResponse> {
  const response = await fetch(
    `${publicConfig.apiBackend}/demographics/?city_district_id=${districtId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch demographic data');
  }
  return response.json();
}
