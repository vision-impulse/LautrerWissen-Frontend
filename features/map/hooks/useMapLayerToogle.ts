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

import { useCallback, useEffect } from "react";
import { Map } from "ol";
import { createWMSLayer, createVectorLayersFromGeoJson } from "../utils/mapLayerCreator";
import { createHeatmapLayer } from "../utils/mapLayerHeatmap";

const ZOOM_THRESHOLD = 15;


export const useMapLayerToggle = (
  map: Map | null,
  layerRefs: Record<string, any>
) => {

  // Monitor map zoom and switch layers dynamically
  useEffect(() => {
    if (!map) return;

    const view = map.getView();

    const handleZoomChange = () => {
      const zoom = view.getZoom();
      Object.keys(layerRefs).forEach((key) => {
        if (key.endsWith("_polygons") || key.endsWith("_centroids")) {
          const baseName = key.replace(/_(polygons|centroids)/, "");
          const polygonLayer = layerRefs[baseName + "_polygons"];
          const centroidLayer = layerRefs[baseName + "_centroids"];

          if (zoom !== undefined && zoom < ZOOM_THRESHOLD) {
            if (polygonLayer) polygonLayer.setVisible(false);
            if (centroidLayer) centroidLayer.setVisible(true);
          } else {
            if (polygonLayer) polygonLayer.setVisible(true);
            if (centroidLayer) centroidLayer.setVisible(false);
          }
        }
      });
    };

    // Initial sync
    handleZoomChange();

    view.on("change:resolution", handleZoomChange);

    return () => {
      view.un("change:resolution", handleZoomChange);
    };
  }, [map, layerRefs]);

  // Toggle visibility and add layers
  const toggleLayerVisibility = useCallback(async (
    layerName: string,
    visible: boolean,
    url: string,
    color: string
  ) => {
    if (!map) return;

    if (visible) {
      if (layerName === "Feldstärke") {
        const heatMapLayer = createHeatmapLayer(layerName, url, map);
        if (heatMapLayer && !layerRefs[layerName]) {
          map.addLayer(heatMapLayer);
          layerRefs[layerName + "_wms"] = heatMapLayer;
        }
      } else if (url.includes("SERVICE=WMS")) {
        const wmsLayer = createWMSLayer(url);
        if (!layerRefs[layerName + "_wms"]) {
          map.addLayer(wmsLayer);
          layerRefs[layerName + "_wms"] = wmsLayer;
        }
      } else {
        try {
          const { pointLayer, polygonLayer, centroidLayer } = await createVectorLayersFromGeoJson(url, map, layerName, color);

          if (pointLayer && !layerRefs[layerName + "_points"]) {
            map.addLayer(pointLayer);
            layerRefs[layerName + "_points"] = pointLayer;
          }

          if (polygonLayer && !layerRefs[layerName + "_polygons"]) {
            map.addLayer(polygonLayer);
            layerRefs[layerName + "_polygons"] = polygonLayer;
          }

          if (centroidLayer && !layerRefs[layerName + "_centroids"]) {
            map.addLayer(centroidLayer);
            layerRefs[layerName + "_centroids"] = centroidLayer;
          }

          // Visibility will be controlled by zoom handler
          polygonLayer?.setVisible(false);
          centroidLayer?.setVisible(true);
        } catch (err) {
          console.error("Failed to load vector data", err);
        }
      }
    } else {
      ["_points", "_polygons", "_centroids", "_wms"].forEach((suffix) => {
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
