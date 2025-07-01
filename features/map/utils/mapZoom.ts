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

import { Map } from "ol";
import { fromLonLat, transformExtent } from 'ol/proj';

export function zoomToKaiserslautern(map: Map) {
  const center = [7.768, 49.440];
  const view = map.getView();
  const center3857 = view.getProjection().getCode() === 'EPSG:4326' ? center : undefined;
  view.setCenter(center3857 ? center : fromLonLat(center));
  view.setZoom(14);
}

export function mapZoomToExtent(map: Map, geometry: any) {
  let allCoords: number[][] = [];

  if (geometry && (geometry.type === "Polygon" || geometry.type === "MultiPolygon")) {
    if (geometry.type === "Polygon") {
      allCoords.push(...geometry.coordinates[0]);
    } else if (geometry.type === "MultiPolygon") {
      geometry.coordinates.forEach((poly: any) => {
        allCoords.push(...poly[0]);
      });
    }
  }

  if (allCoords.length > 0) {
    const minX = Math.min(...allCoords.map((c) => c[0]));
    const minY = Math.min(...allCoords.map((c) => c[1]));
    const maxX = Math.max(...allCoords.map((c) => c[0]));
    const maxY = Math.max(...allCoords.map((c) => c[1]));

    if ([minX, minY, maxX, maxY].every(Number.isFinite)) {
      const extent4326 = [minX, minY, maxX, maxY];
      const extent3857 = transformExtent(extent4326, "EPSG:4326", "EPSG:3857");
      map.getView().fit(extent3857, {
        duration: 700,
        padding: [120, 120, 120, 120],
      });
    }
  }
}
