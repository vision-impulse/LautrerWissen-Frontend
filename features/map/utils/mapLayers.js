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

import 'ol/ol.css';
import { Map, View, Overlay, Feature } from 'ol';
import { Zoom, Attribution, FullScreen, Rotate } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { Point, Polygon } from 'ol/geom';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import { Control } from 'ol/control';
import { Tile, Vector as VectorLayer } from 'ol/layer';
import { OSM, TileWMS, XYZ, Vector} from 'ol/source';

import { toLonLat } from 'ol/proj';
import { getDistance } from 'ol/sphere';


export function createPointVectorLayerDynamicZoom(coordinates, map, hasFixedRadius, color) {
    var vectorSource = new Vector();

    Object.keys(coordinates).forEach(function (key) {
        var coordData = coordinates[key];
        var marker = new Feature({
            geometry: new Point(fromLonLat(coordData.coordinate)),
            id: coordData.id,
//            fixedRadius: coordData.fixedRadius || false, // New flag to determine if radius should be fixed
            ...coordData.properties,
        });
        vectorSource.addFeature(marker);
    });

    function setAlpha(color, alpha) {
        const array = asArray(color).slice();
        array[3] = alpha;
        return array;
        }

    // Function to get dynamic marker style
    function getMarkerStyle(feature, resolution) {
        const isFixed = hasFixedRadius || false; //#feature.get('fixedRadius'); // Check if the radius should be fixed
        let radius = 7; // Default radius

        if (isFixed) {
            // Convert 30 meters to pixels dynamically
            const center = toLonLat(feature.getGeometry().getCoordinates());
            const offset = [center[0], center[1] + 0.00027/30*60]; // Roughly 30m in lat direction
            
            const metersPerPixel = getDistance(center, offset) / resolution;
            radius = metersPerPixel; // Correct conversion of 30m to pixels

        } else {
            // Adjust size dynamically based on zoom level
            const zoom = Math.log2(156543.03390625 / resolution); // Approximate zoom calculation
            //if (zoom < 20) {
            //    radius = 3; // Larger radius at low zoom
            //}
            radius = 8;
        }
        // fill: new Fill({ color: 'rgba(0, 124, 189, 0.83)' }),
        return new Style({
            image: new Circle({
                radius: radius,
                fill: new Fill({ color }),
                stroke: new Stroke({ color: '#000000', width: 0.75 })
            })
        });
    }

    // Create vector layer with dynamic styling
    var vectorLayer = new VectorLayer({
        source: vectorSource,
        style: function (feature, resolution) {
            return getMarkerStyle(feature, resolution);
        }
    });

    return vectorLayer;
}


/**
 * Create and return a vector layer for given coordinates.
 * @param {Object} coordinates - An object where keys represent unique IDs, and values contain coordinate, name, and id.
 * @returns {ol.layer.Vector} - The OpenLayers vector layer with markers for the given coordinates.
 */
export function createPointVectorLayer(coordinates, color) {
    // Create a vector source
    var vectorSource = new Vector();

    // Loop through the coordinates and add features
    Object.keys(coordinates).forEach(function(key) {
        var coordData = coordinates[key];
        var marker = new Feature({
            geometry: new Point(fromLonLat(coordData.coordinate)),
            //name: coordData.name,
            id: coordData.id,
            ...coordData.properties,
        });
        vectorSource.addFeature(marker);
    });

    // Define a marker style
    var markerStyle = new Style({
        image: new Circle({
            radius: 7,
            fill: new Fill({ color }),
            stroke: new Stroke({ color: '#000000', width: 1.25 })
        })
    });

    // Create and return the vector layer
    return new VectorLayer({
        source: vectorSource,
        style: markerStyle
    });
}


/**
 * Accepts an array OR object of GeoJSON‑like features
 * (each with { type:'Polygon'|'MultiPolygon', coordinates: … , properties: … } )
 * and returns a styled VectorLayer.
 */
export function createPolygonVectorLayer(featuresInput, fillColor = "rgba(255,0,0,0.4)") {
  // ---------------- normalise input ----------------
  const featuresArr = Array.isArray(featuresInput)
    ? featuresInput
    : Object.values(featuresInput);   // when it was the "dictionary" variant

    var vectorSource = new Vector();

  featuresArr.forEach((item) => {
    const { type, coordinates, properties = {} } = item;

    if (type === "Polygon") {
      const rings = coordinates.map(coord => fromLonLat(coord));
      vectorSource.addFeature(
        new Feature({
          geometry: new Polygon([rings]),
          ...properties,
        })
      );
    }
  });

  // ---------------- style & layer ----------------
  const polygonStyle = new Style({
    fill:   new Fill({   color: fillColor }),
    stroke: new Stroke({ color: "#000000", width: 0.75 }),
  });

  return new VectorLayer({
    source: vectorSource,
    style:  polygonStyle,
  });
}



function computePolygonCentroid(coords) {
  if (!Array.isArray(coords) || !Array.isArray(coords[0]) || coords[0].length < 2) {
    return [0, 0]; // fallback for invalid or too small polygon
  }

  const ring = coords; // Use outer ring
  let x = 0, y = 0, area = 0;

  for (let i = 0; i < ring.length - 1; i++) {
    const p1 = ring[i];
    const p2 = ring[i + 1];
    if (!Array.isArray(p1) || !Array.isArray(p2)) continue;

    const [x0, y0] = p1;
    const [x1, y1] = p2;

    const a = x0 * y1 - x1 * y0;
    area += a;
    x += (x0 + x1) * a;
    y += (y0 + y1) * a;
  }

  area *= 0.5;
  if (area === 0) return ring[0]; // fallback to first coordinate

  x /= (6 * area);
  y /= (6 * area);

  return [x, y];
}

export function parseJsonForPointsAndPolygons(data) {
  const points = [];
  const polygons = [];
  const centroids = [];

  if (!data?.features?.length) return { points: null, polygons: null, centroids: null };

  data.features.forEach((feat) => {
    const g = feat.geometry;
    if (!g || !g.coordinates) return;

    const props = feat.properties ?? {};
    const base = {
      ...props,
      id: props.id ?? feat.id ?? null,
      properties: props,
    };
    switch (g.type) {
      case "Point":
        if (g.coordinates.length === 2) {
          points.push({ ...base, coordinate: g.coordinates });
        }
        break;
      case "Polygon":
        polygons.push({ ...base, type: "Polygon", coordinates: g.coordinates });
        centroids.push({ ...base, type: "Point", coordinate: computePolygonCentroid(g.coordinates) });
        break;
      case "MultiPolygon":
        const poly_coords_outer = g.coordinates[0]
        polygons.push({ ...base, type: "Polygon", coordinates: poly_coords_outer });
        centroids.push({ ...base, type: "Point", coordinate: computePolygonCentroid(poly_coords_outer) });
        break;
      default:
        break;
    }
  });

  return {
    points: points.length ? points : null,
    polygons: polygons.length ? polygons : null,
    centroids: centroids.length ? centroids : null,
  };
}


