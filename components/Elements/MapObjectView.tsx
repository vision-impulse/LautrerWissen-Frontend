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

import React, { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";

interface MapObjectViewProps {
  position: [number, number]; // [lng, lat]
  height?: string;
}

const MapObjectView: React.FC<MapObjectViewProps> = ({ position, height = "150px" }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapObjRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const [lng, lat] = position;
    const coordinates = fromLonLat([lng, lat]);

    const marker = new Feature({
      geometry: new Point(coordinates),
    });

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 6,
          fill: new Fill({ color: "navy" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      })
    );

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [marker],
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [],
          }),
        }),
        vectorLayer,
      ],
      view: new View({
        center: coordinates,
        zoom: 14,
      }),
      controls: [],
    });

    mapObjRef.current = map;

    return () => {
      map.setTarget(undefined);
    };
  }, [position]);

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height }}
      className="rounded-lg overflow-hidden"
    />
  );
};

export default MapObjectView;
