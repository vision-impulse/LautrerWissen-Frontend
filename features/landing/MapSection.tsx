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

"use client";

import { useEffect, useRef } from "react";
import geojsonData from "@/assets/polygons.json";
import * as d3 from "d3";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

export default function MapSection() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    // Clear previous render if reloaded
    d3.select(mapContainer).selectAll("*").remove();

    const width = 500;
    const height = 500;

    try {
      const svg = d3
        .select(mapContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet");

      const projection = d3
        .geoMercator()
        .fitSize([width, height], geojsonData as GeoJSON.FeatureCollection);
      const path = d3.geoPath().projection(projection);

      // Tailwind colors from the configuration
      const fullConfig = resolveConfig(tailwindConfig);
      const colors = {
        mainDark: fullConfig.theme?.colors?.["main-dark-blue"] || "#000000",
        mainStroke: fullConfig.theme?.colors?.["main-map-stroke"] || "#000000",
        hoverFill: fullConfig.theme?.colors?.["main-map"] || "#000000",
      };

      const polygons = svg
        .selectAll(".polygon")
        .data(geojsonData.features)
        .enter()
        .append("path")
        .attr("class", "polygon")
        // @ts-ignore
        .attr("d", path)
        .attr("fill", colors.mainDark)
        .attr("stroke", colors.mainStroke)
        .attr("stroke-width", "1px")
        .on("mouseover", function () {
          d3.select(this)
            .style("fill", colors.hoverFill)
            .style("stroke", colors.mainStroke)
            .style("stroke-width", "2px");
        })
        .on("mouseout", function () {
          d3.select(this)
            .style("fill", colors.mainDark)
            .style("stroke", colors.mainStroke)
            .style("stroke-width", "1px");
        })
        .on("click", function (_, d: any) {
          const url = `./districts/?ID=${d.properties.ID}`;
          window.open(url, "_self");
        });

      // Add IDs as text in the middle of polygons
      svg
        .selectAll(".polygon-label")
        .data(geojsonData.features)
        .enter()
        .append("text")
        // @ts-ignore
        .attr("x", (d) => path.centroid(d)[0])
        // @ts-ignore
        .attr("y", (d) => path.centroid(d)[1])
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "14px")
        .attr("fill", "white")
        .text((d: any) => d.properties.ID);
    } catch (error) {
      console.error("Error rendering d3 map:", error);
    }
  }, []);

  // Sort features by ID
  const sortedFeatures = [...geojsonData.features].sort(
    (a: any, b: any) => a.properties.ID - b.properties.ID
  );

  return (
    <section className="bg-white">
      <div className="py-28 radius-for-skewed">
        <div className="container mx-auto px-2 max-w-screen-xl">
          <h2 className="text-center text-main-dark my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">
            Wissen nach Ortsbezirken
          </h2>

          {/* Responsive flex: stack on md-, side-by-side on lg+ */}
          <div className="py-4 flex flex-col lg:flex-row items-start gap-4">

            {/* Map Column */}
            <div className="w-full lg:w-1/2 order-1 flex justify-center 2xl:order-1">
              <div className="w-full h-[400px] md:h-[500px] p-4">
                <div ref={mapContainerRef} className="w-full h-full" />
              </div>
            </div>
            {/* List Column */}
            <div className="px-8 w-full lg:w-1/2 order-2">
              <div className="my-2 md:mt-16 p-2 shadow rounded-2xl border bg-blue-50 flex flex-col items-center text-center">
                <h4 className="text-2xl font-bold font-heading leading-tight text-main-dark">
                  Ortsbezirksseiten
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {sortedFeatures.map((feature: any) => (
                      <a
                        key={feature.properties.ID}
                        href={`./districts/?ID=${feature.properties.ID}`}
                        className="px-2 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                      >
                        {feature.properties.Name} ({feature.properties.ID})
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
