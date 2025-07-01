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

'use client';

import WikiObjectDetailBoxes from '@/features/wikipedia/WikiObjectDetailBoxes'
import WikiObjectList from '@/features/wikipedia/WikiObjectList';
import { useWikipediaModelList } from '@/hooks/api/useWikipediaModelList';
import { useWikipediaModelDetail } from '@/hooks/api/useWikipediaModelDetail';
import { getWikiCulturalMonumentDetails, getWikiCulturalMonumentList } from '@/api/wikipedia';
import { useParams } from 'next/navigation';

export default function CulturalMonumentPage() {
  const params = useParams<{ id: string }>(); // Get the parameters from the URL
  const id = params?.id; // Safely access 'id'  
  const { data, isLoading, error } = useWikipediaModelDetail(getWikiCulturalMonumentDetails, id);
  const { objects, isLoadingObjects, errorObjects } = useWikipediaModelList(getWikiCulturalMonumentList);

  return (
    <div>
    <WikiObjectDetailBoxes 
        data={data}
        isLoading={isLoading}
        error={error}
        titleInfoBox='Informationen zum Kulturdenkmal'
        titleImageBox='Bilder des Kulturdenkmals'
        titleNearbyObjectBox='Kulturdenkmale in der Umgebung'
        titleLocationBox='Verortung des Kulturdenkmals'
    />
    <WikiObjectList
        objects={objects}
        isLoading={isLoadingObjects}
        error={errorObjects}
        titleListBox='Liste weiterer Kulturdenkmale'
    />
    </div>
    );
}
  
  
  