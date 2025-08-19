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

import { useEffect } from "react";
import 'ol/ol.css';

type Coordinates = [number, number];

interface ObjectMapProps {
  coordinates: Coordinates;
}

export default function ObjectMap({ coordinates }: ObjectMapProps) {
  useEffect(() => {
    async function initializeMap() {
      if (!coordinates) return;

      // Prevent reinitialization
      const existingMap = document
        .getElementById("map_small")
        ?.getAttribute("data-map-initialized");
      if (existingMap) return;

      // Mark the div as initialized
      document.getElementById("map_small")?.setAttribute("data-map-initialized", "true");

      const [
        { default: Map },
        { default: OSM },
        { default: View },
        { default: VectorSource },
        { default: VectorLayer },
        { default: Feature },
        { default: Point },
        { fromLonLat },
        { default: Style },
        { default: Circle },
        { default: Fill },
        { default: Stroke },
        { default: Tile },
        { default: XYZ },
        { default: Zoom },
        { default: Attribution },
        { default: FullScreen },
        { default: Rotate },
      ] = await Promise.all([
        import("ol/Map"),
        import("ol/source/OSM"),
        import("ol/View"),
        import("ol/source/Vector"),
        import("ol/layer/Vector"),
        import("ol/Feature"),
        import("ol/geom/Point"),
        import("ol/proj"),
        import("ol/style/Style"),
        import("ol/style/Circle"),
        import("ol/style/Fill"),
        import("ol/style/Stroke"),
        import("ol/layer/Tile"),
        import("ol/source/XYZ"),
        import("ol/control/Zoom"),
        import("ol/control/Attribution"),
        import("ol/control/FullScreen"),
        import("ol/control/Rotate"),
      ]);

      const vectorSource = new VectorSource();
      const marker = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
      });
      vectorSource.addFeature(marker);

      const markerStyle = new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: "rgba(0, 61, 111, 0.9)" }),
          stroke: new Stroke({ color: "black", width: 0.75 }),
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: markerStyle,
      });

      const wmsBaseMapOSM = new Tile({
        source: new OSM(),
      });


      new Map({
        target: "map_small",
        controls: [
          new Zoom(),            // Zoom control
          new Attribution(),     // Attribution control
          new FullScreen(),      // Full-screen control
          new Rotate(),          // Rotate control
        ],
        layers: [
          wmsBaseMapOSM,
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat(coordinates),
          projection: 'EPSG:3857',
          zoom: 18,
        }),
      });
    }

    initializeMap();
  }, [coordinates]);

  return <div id="map_small" className="height:400px" ></div>;
}
