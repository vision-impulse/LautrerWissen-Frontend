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
import { parseJsonForPointsAndPolygons } from "./mapLayers";
import { Map } from "ol";

export const createWMSLayer = (query: string): Tile => {
  const args = Object.fromEntries(
    query.split("&").map(p => {
      const [key, ...rest] = p.split("=");
      return [key, rest.join("=")];
    })
  );
  const base_layer = args.layer;
  const base_url = args.URL;
  const epsg = args.SRS || 'EPSG:3857';
  return new Tile({
    source: new TileWMS({
      url: base_url,
      params: {
        LAYERS: base_layer,
        STYLES: '',
        FORMAT: 'image/png',
        TRANSPARENT: true,
        VERSION: '1.1.1'
      },
      projection: epsg
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
  centroidLayer: Vector | null,
}> => {
  const res = await fetch(url).then((r) => r.json());
  const parsed = parseJsonForPointsAndPolygons(res);

  const pointLayer = parsed.points
    ? createPointVectorLayerDynamicZoom(parsed.points, map, layerName === "Umweltsensoren", color)
    : null;

  const polygonLayer = parsed.polygons
    ? createPolygonVectorLayer(parsed.polygons, color)
    : null;

  const centroidLayer = parsed.centroids
    ? createPointVectorLayerDynamicZoom(parsed.centroids, map, layerName === "Umweltsensoren", color)
    : null;

  return { pointLayer, polygonLayer, centroidLayer };
};
