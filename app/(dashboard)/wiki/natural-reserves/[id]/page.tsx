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
import { getWikiNaturalReserveDetails, getWikiNaturalReserveList } from '@/api/wikipedia';
import { useParams } from 'next/navigation';


export default function NaturalReservesPage() {
    const params = useParams<{ id: string }>(); // Get the parameters from the URL
    const id = params?.id; // Safely access 'id'  
    const { data, isLoading, error } = useWikipediaModelDetail(getWikiNaturalReserveDetails, id);
    const { objects, isLoadingObjects, errorObjects } = useWikipediaModelList(getWikiNaturalReserveList);

    return (
    <div>
    <WikiObjectDetailBoxes 
        data={data}
        isLoading={isLoading}
        error={error}
        titleInfoBox='Informationen zum Naturschutzgebiet'
        titleImageBox='Bilder des Naturschutzgebiets'
        titleNearbyObjectBox='Naturschutzgebiete in der Umgebung'
        titleLocationBox='Verortung des Naturschutzgebiets'
    />
    <WikiObjectList
        objects={objects}
        isLoading={isLoadingObjects}
        error={errorObjects}
        titleListBox='Liste weiterer Naturschutzgebiete'
    />
    </div>
    );
}