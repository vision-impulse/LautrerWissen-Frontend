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

import { Heatmap as HeatmapLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Point from 'ol/geom/Point';


const rssiToWeight = (rssi: number): number => {
    const minRSSI = -150;
    const maxRSSI = -40;
    const clamped = Math.min(minRSSI, Math.max(maxRSSI, rssi));
    return ((rssi - minRSSI) / (maxRSSI - minRSSI));
};

const metersToPixels = (meters: number, resolution: number): number => {
    return meters / resolution;
};

export function createHeatmapLayer(layerName: string, url: string, map: Map) {
    if (layerName === "Feldstärke") {
        const vectorSource = new VectorSource({
            format: new GeoJSON(),
        });

        vectorSource.setLoader((extent, resolution, projection) => {
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    const rawFeatures = new GeoJSON().readFeatures(data, {
                        featureProjection: projection,
                    });

                    // Filter features with valid RSSI
                    const filtered = rawFeatures.filter((f) => {
                        const rssi = f.get('RSSI');
                        return typeof rssi === 'number' && !isNaN(rssi);
                    });

                    // Sort by created_at DESC (most recent first)
                    filtered.sort((a, b) => {
                        const aTime = new Date(a.get('created_at')).getTime();
                        const bTime = new Date(b.get('created_at')).getTime();
                        return bTime - aTime;
                    });

                    const accepted: typeof filtered = [];

                    filtered.forEach((feature) => {
                        const geometry = feature.getGeometry();
                        const coord = (feature.getGeometry() as Point)?.getCoordinates();

                        const isTooClose = accepted.some((existing) => {
                            const existingCoord = (existing.getGeometry() as Point)?.getCoordinates();
                            if (!coord || !existingCoord) return false;

                            const dx = coord[0] - existingCoord[0];
                            const dy = coord[1] - existingCoord[1];
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            return dist < 15.0; // meters
                        });

                        if (!isTooClose) {
                            const rssi = feature.get('RSSI');
                            feature.set('weight', rssiToWeight(rssi));
                            accepted.push(feature);
                        }
                    });

                    vectorSource.clear();
                    vectorSource.addFeatures(accepted);
                })
                .catch((err) => console.error('Failed to load GeoJSON', err));
        });

        const heatmap = new HeatmapLayer({
            source: vectorSource,
            weight: 'weight',
            radius: 15, // default, will be updated to 5m below
            blur: 20,

        });
        heatmap.setOpacity(0.7);

        const view = map.getView();
        const updateRadius = () => {
            const resolution = view.getResolution();
            if (resolution !== undefined && resolution > 11) {
                const radius = metersToPixels(60, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
            else if (resolution !== undefined && resolution < 11 && resolution > 5) {
                const radius = metersToPixels(50, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
            else if (resolution !== undefined && resolution < 5 && resolution > 3.5) {
                const radius = metersToPixels(30, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
            else if (resolution !== undefined && resolution < 3.5 && resolution > 2) {
                const radius = metersToPixels(25, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
            else if (resolution !== undefined && resolution < 2 && resolution > 1) {
                const radius = metersToPixels(20, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
            else if (resolution !== undefined && resolution < 1 && resolution > 0.4) {
                const radius = metersToPixels(13, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
            else if (resolution !== undefined && resolution < 0.4) {
                const radius = metersToPixels(10, resolution); // 5 meters in pixels
                heatmap.setRadius(radius);
            }
        };
        view.on('change:resolution', updateRadius);
        updateRadius(); // Set initial radius

        return heatmap;

    }
}
