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
          fill: new Fill({ color: "rgba(0, 0, 189, 0.4)" }),
          stroke: new Stroke({ color: "black", width: 0.75 }),
        }),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: markerStyle,
      });


      const cartoBasemap = new Tile({
        source: new XYZ({
            url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attributions: '© <a href="https://www.carto.com/">CARTO</a>',
            tileSize: 128,
            maxZoom: 22
        }),
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
          cartoBasemap,
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
