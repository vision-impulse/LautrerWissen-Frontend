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

"use client";

import { useEffect, useState, useRef } from "react";
import * as ol from "ol";
import TileLayer from "ol/layer/Tile";
import { Vector as VectorLayer } from "ol/layer";
import { useMap } from "../hooks/useMap";
import { useMapLayerToggle } from "../hooks/useMapLayerToogle"


interface MapComponentProps {
  onLayerVisibilityChange: (toggle: (layerName: string, visible: boolean, url: string, color: string) => void) => void;
  onMapReady: (map: ol.Map) => void;
}

const MapComponent = ({ onLayerVisibilityChange, onMapReady }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<Record<string, VectorLayer | TileLayer | null>>({});
  const map = useMap(mapRef);

  useEffect(() => {
    if (map) {
      onMapReady(map);
    }
  }, [map]);

  const toggleLayerVisibility = useMapLayerToggle(map, layerRefs.current);

  useEffect(() => {
    onLayerVisibilityChange(toggleLayerVisibility);
  }, [map, toggleLayerVisibility, onLayerVisibilityChange]);

  return (
    <>
      <div className="relative w-full h-full bg-gray-50 shadow-sm rounded-xl border-b">
        <div className="text-base md:text-base text-gray-800">
          <div className="w-full h-full">
            <div id="map" ref={mapRef}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
