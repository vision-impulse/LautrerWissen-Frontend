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

import { useCallback, useEffect, useState } from 'react';
import geojsonData from '@/assets/polygons.json';
import MapComponent from '@/features/map/components/MapComponent';
import LayerCheckboxes from '@/features/map/components/MapCheckbox';
import MapSidebar from '@/features/map/components/MapSidebar';
import { Menu, X } from 'lucide-react';
import '../../../assets/globals.css'
import { fromLonLat, transformExtent } from 'ol/proj';
import { Map } from "ol";
import { LayerGroup } from '@/types/map-ui';
import usePolygons from '@/features/map/hooks/useDistrictPolygons';
import { mapZoomToExtent, zoomToKaiserslautern } from "@/features/map/utils/mapZoom";


interface MapLayerViewProps {
  layerGroups: LayerGroup[];
  initialExpandedGroups?: string[];
  sidebarReady: boolean;
  selectedPolygonId?: string;
}

const MapLayerView: React.FC<MapLayerViewProps> = ({ layerGroups, initialExpandedGroups, sidebarReady, selectedPolygonId }) => {
  const [toggleLayerVisibility, setToggleLayerVisibility] = useState<
    (layerName: string, visible: boolean, url: string, color: string, legendUrl?: string) => void
  >(() => () => { });
  const [map, setMap] = useState<Map | null>(null); // Store map instance here
  const polygons = usePolygons();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPolygon, setSelectedPolygon] = useState<string | null>(null); // Selected polygon ID

  useEffect(() => {
    if (selectedPolygonId) {
      handlePolygonSelect(selectedPolygonId)
    }
  }, [selectedPolygonId, map]);

  const handleLayerVisibilityChange = useCallback(
    (fn: (layerName: string, visible: boolean, url: string, color: string, legendUrl?: string) => void) => {
      setToggleLayerVisibility(() => fn);
    },
    []
  );

  const handlePolygonSelect = (selectedId: string) => {
    setSelectedPolygon(selectedId);
    if (!map) return;
    if (selectedId === "all") {
      zoomToKaiserslautern(map);
      return;
    }

    const polygonData = polygons.find((p) => String(p.id) === selectedId);
    if (polygonData) {
      try {
        mapZoomToExtent(map, polygonData.geometry);
      } catch (e) {
        console.error("Error zooming to polygon", e);
      }
    }
  };

  return (
    <div className="flex flex-1 z-10 relative overflow-hidden">

      {/* Sidebar Toggle (Small Screens and Large Screens) */}
      {sidebarReady && (
        <MapSidebar
          layerGroups={layerGroups}
          initialExpandedGroups={initialExpandedGroups}
          polygons={polygons}
          selectedPolygon={selectedPolygon}
          onPolygonSelect={handlePolygonSelect}
          onToggleLayer={toggleLayerVisibility}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}


      {/* Map takes full remaining space */}
      <div className={`flex-1 h-full relative z-30 ${sidebarOpen ? "ml-80" : "ml-0"}`}>
        <MapComponent
          onLayerVisibilityChange={handleLayerVisibilityChange}
          onMapReady={setMap} />
      </div>
    </div>
  );
};

export default MapLayerView;