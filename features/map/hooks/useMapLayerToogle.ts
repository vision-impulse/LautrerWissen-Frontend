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

import { useCallback } from "react";
import { Map } from "ol";
import { createWMSLayer, createVectorLayersFromGeoJson } from "../utils/mapLayerCreator";
import { createHeatmapLayer } from "../utils/mapLayerHeatmap";

export const useMapLayerToggle = (
  map: Map | null,
  layerRefs: Record<string, any>
) => {
  const toggleLayerVisibility = useCallback(async (
    layerName: string,
    visible: boolean,
    url: string,
    color: string
  ) => {
    if (!map) return;

    if (visible) {

      // heatmap layers 
      if (layerName === "Feldstärke") {
        const heatMapLayer = createHeatmapLayer(layerName, url, map);
        if (heatMapLayer && !layerRefs[layerName]) {
          map.addLayer(heatMapLayer);
          layerRefs[layerName + "_wms"] = heatMapLayer;
        }
      } // wms layers 
      else if (url.includes("SERVICE=WMS")) {
        const wmsLayer = createWMSLayer(url);
        if (!layerRefs[layerName]) {
          map.addLayer(wmsLayer);
          layerRefs[layerName + "_wms"] = wmsLayer;
        }
      }
      else { // vector layers 
        try {
          const { pointLayer, polygonLayer } = await createVectorLayersFromGeoJson(url, map, layerName, color);
          if (pointLayer && !layerRefs[layerName + "_points"]) {
            map.addLayer(pointLayer);
            layerRefs[layerName + "_points"] = pointLayer;
          }
          if (polygonLayer && !layerRefs[layerName + "_polygons"]) {
            map.addLayer(polygonLayer);
            layerRefs[layerName + "_polygons"] = polygonLayer;
          }
        } catch (err) {
          console.error("Failed to load vector data", err);
        }
      }
    } else {
      ["_points", "_polygons", "_wms"].forEach((suffix) => {
        const layer = layerRefs[layerName + suffix];
        if (layer) {
          map.removeLayer(layer);
          layerRefs[layerName + suffix] = null;
        }
      });
    }
  }, [map, layerRefs]);

  return toggleLayerVisibility;
};
