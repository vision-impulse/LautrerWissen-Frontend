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

import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Stroke, Style } from "ol/style";

let districtLayer: VectorLayer<VectorSource> | null = null;

export function showDistrictPolygon(map: Map, geometry: any) {
    if (!geometry) return;

    if (!districtLayer) {
        districtLayer = new VectorLayer({
            source: new VectorSource(),
            style: new Style({
                stroke: new Stroke({
                    color: "#2563eb",
                    width: 3,
                }),
                fill: new Fill({
                    color: "rgba(37, 99, 235, 0.05)",
                }),
            }),
            zIndex: 50,
        });
        map.addLayer(districtLayer);
    }

    const source = districtLayer.getSource();
    source?.clear();

    const features = new GeoJSON().readFeatures(
        { type: "Feature", geometry },
        {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
        }
    );

    features.forEach((feature) => {
        feature.set("nonInteractive", true);
    });

    source?.addFeatures(features);
}

export function clearDistrictPolygon(map: Map) {
    districtLayer?.getSource()?.clear();
}
