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

'use client'

import React, { Suspense } from 'react';
import MapLayerView from '@/features/map/components/MapLayerViewFullScreen';
import { useSearchParams } from 'next/navigation';
import { DEFAULT_LAYER_CONFIG, DEFAULT_EXPANDED_GROUP_CONFIG } from '@/features/map/utils/mapSidebarDefaultConfig'

import { LayerGroup } from '@/types/map-ui';
import { useSidebarConfig } from "@/hooks/api/useMapSidebarConfig";


const MapFullScreenViewContent = () => {
    const searchParams = useSearchParams();
    const category = searchParams?.get('category') || 'leisure';
    const district_id = searchParams?.get('district_id') || '' ;

    const { layerGroups, isLoading, error } = useSidebarConfig();
    const initialExpandedGroups = DEFAULT_EXPANDED_GROUP_CONFIG[category] || [];
  
    //if (!layerGroups || layerGroups.length === 0) 
    //  return <p>Failed to load layer groups</p>;
    
    return (
      <div>
        <MapLayerView 
          layerGroups={layerGroups}
          initialExpandedGroups={initialExpandedGroups} 
          sidebarReady={!isLoading}
          selectedPolygonId={district_id} />
      </div>
    );
};


const MapFullScreenView = () => {
  return (
    <MapFullScreenViewContent />
  );
};
export default MapFullScreenView;