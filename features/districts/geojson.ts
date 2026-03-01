/**
 * @file This file is part of LautrerWissen
 * @author Benjamin Bischke
 * @copyright 2026 Vision Impulse GmbH
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

import geojsonDataRaw from "@/assets/polygons.json";

export type RawProperties = {
  Nummer: string;
  Bezirk: string;
  [key: string]: any;
};

export type NormalizedProperties = {
  ID: string;
  Name: string;
  [key: string]: any;
};

type RawFeature = GeoJSON.Feature<GeoJSON.Geometry, RawProperties>;
type NormalizedFeature = GeoJSON.Feature<
  GeoJSON.Geometry,
  NormalizedProperties
>;

export function normalizeFeature(
  feature: RawFeature
): NormalizedFeature {
  return {
    ...feature,
    properties: {
      ...feature.properties,
      ID: feature.properties.Nummer,
      Name: feature.properties.Bezirk,
    },
  };
}

export function normalizeFeatureCollection(
  geojson: GeoJSON.FeatureCollection<
    GeoJSON.Geometry,
    RawProperties
  >
): GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  NormalizedProperties
> {
  return {
    ...geojson,
    features: geojson.features.map(normalizeFeature),
  };
}

export function getNormalizedGeoJson() {
  const typed =
    geojsonDataRaw as GeoJSON.FeatureCollection<
      GeoJSON.Geometry,
      RawProperties
    >;

  return normalizeFeatureCollection(typed);
}