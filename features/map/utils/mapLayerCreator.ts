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

import { Tile, Vector } from "ol/layer";
import { TileWMS } from "ol/source";
import { createPointVectorLayerDynamicZoom, createPolygonVectorLayer } from "./mapLayers";
import { parseJsonForPointsAndPolygonsNew } from "./mapLayers";
import { Map } from "ol";

export const createWMSLayer = (url: string): Tile => {
  if (url.includes('geoportal.rlp')) {
    return new Tile({
      source: new TileWMS({
        url,
        params: {
          'LAYERS': 'edm_flaechen',
          'TRANSPARENT': true,
          'FORMAT': 'image/png',
          'VERSION': '1.1.1',
          'SERVICE': 'WMS',
          'REQUEST': 'GetMap',
          'SRS': 'EPSG:3857',
          'TILED': true,
        },
        serverType: 'geoserver',
      }),
    });
  }

  return new Tile({
    source: new TileWMS({
      url,
      params: {},
      projection: 'EPSG:4326',
    }),
  });
};

export const createVectorLayersFromGeoJson = async (
  url: string,
  map: Map,
  layerName: string,
  color: string
): Promise<{
  pointLayer: Vector | null,
  polygonLayer: Vector | null,
}> => {
  const res = await fetch(url).then((r) => r.json());
  const parsed = parseJsonForPointsAndPolygonsNew(res);

  const pointLayer = parsed.points
    ? createPointVectorLayerDynamicZoom(parsed.points, map, layerName === "Umweltsensoren", color)
    : null;

  const polygonLayer = parsed.polygons
    ? createPolygonVectorLayer(parsed.polygons, color)
    : null;

  return { pointLayer, polygonLayer };
};
