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

import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Control } from 'ol/control';
import { Tile, } from 'ol/layer';
import { OSM, TileWMS, XYZ } from 'ol/source';
import { centroid as t_centroid } from '@turf/turf';
import { TileGrid } from 'ol/tilegrid';
import { defaults as defaultControls, Attribution, Zoom, Rotate } from "ol/control";
import { addBaseMapSelector } from "./mapInitButtons";
import { addPopupOverlay } from "./mapInitPopupOverlay";


export function initializeMap(
  container: HTMLElement | null,
  onBaseMapLegendChange?: (legendUrl: string | null, label: string) => void
): Map | null {
  if (typeof window === 'undefined' || !container) return null;

  const zoomControl = new Zoom({
    className: 'custom-zoom',
  });

  const map = new Map({
    target: container || 'map',
    layers: [],
    view: new View({
      projection: 'EPSG:3857',
      center: fromLonLat([7.7581375, 49.4454858]),
      zoom: 15
    }),
    controls: defaultControls({
      attribution: false,
      zoom: false,
    }).extend([
      new Attribution({
        collapsible: true,
        collapsed: true,
        tipLabel: "Attributions",
      }),
      zoomControl,
    ]),
  });

  addBaseMapSelector(map, onBaseMapLegendChange);
  addPopupOverlay(map);
  return map;
}
