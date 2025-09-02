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

import { useEffect, useRef, useState } from "react";
import geojsonData from "@/assets/polygons.json";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import * as d3 from "d3";


export default function MapSection() {
  const mapContainerRef = useRef(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

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

      // Tailwind colors
      const fullConfig = resolveConfig(tailwindConfig);
      const colors = {
        mainDark: fullConfig.theme?.colors?.["main-dark"] || "#000000",
        mainStroke: fullConfig.theme?.colors?.["blue-50"] || "#000000",
        hoverFill: fullConfig.theme?.colors?.["main-dark-blue"] || "#000000",
      };

      // Draw polygons
      svg
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
        .on("mouseover", function (_, d: any) {
          setHoveredId(d.properties.ID);
        })
        .on("mouseout", function () {
          setHoveredId(null);
        })
        .on("click", function (_, d: any) {
          const url = `./districts/?ID=${d.properties.ID}`;
          window.open(url, "_self");
        });

      // Add IDs as text
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

  useEffect(() => {
    // Update polygon styles based on hover state
    const fullConfig = resolveConfig(tailwindConfig);
    const colors = {
      mainDark: fullConfig.theme?.colors?.["main-dark"] || "#000000",
      mainStroke: fullConfig.theme?.colors?.["blue-50"] || "#000000",
      hoverFill: fullConfig.theme?.colors?.["main-map-hover"] || "#000000",
    };

    d3.select(mapContainerRef.current)
      .selectAll<SVGPathElement, any>(".polygon")
      .transition()
      .duration(100)
      .attr("fill", (d: any) =>
        d.properties.ID === hoveredId ? colors.hoverFill : colors.mainDark
      )
      .attr("stroke-width", (d: any) =>
        d.properties.ID === hoveredId ? "2px" : "1px"
      );
  }, [hoveredId]);

  return (
    <section className="" id="districts_section">
      <div className="py-28 radius-for-skewed">
        <div className="container mx-auto px-2 max-w-screen-xl">
          <h2 className="text-center text-main-dark my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">
            Wissen nach Ortsbezirken
          </h2>

          <div className="py-8 flex flex-col lg:flex-row justify-center gap-4">
            {/* List Column */}
            <div className="px-8 w-full lg:w-1/3 order-1 text-main-dark md:px-48 lg:px-2">
              <div className="py-2 p-2 shadow rounded-2xl border bg-white border-gray-300 flex flex-col items-center text-center">
                <h4 className="py-2 text-2xl font-bold font-heading leading-tight ">
                  Ortsbezirksseiten
                </h4>
                <div className="pt-2 flex flex-col gap-2 w-full p-2">
                  <div className="grid gap-1">
                    {sortedFeatures.map((feature: any) => {
                      const isHovered = hoveredId === feature.properties.ID;
                      return (
                        <a
                          key={feature.properties.ID}
                          href={`./districts/?ID=${feature.properties.ID}`}
                          onMouseEnter={() =>
                            setHoveredId(feature.properties.ID)
                          }
                          onMouseLeave={() => setHoveredId(null)}
                          className={`px-0 py-1 font-medium hover:rounded-lg ${isHovered
                              ? "bg-main-dark-blue px-10 text-white rounded-lg"
                              : "text-black  border-gray-400 rounded-lg hover:bg-main-dark-blue px-10 hover:text-white"
                            }`}
                        >
                          {feature.properties.Name} ({feature.properties.ID})
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Column */}
            <div className="w-full lg:w-1/2 order-2 flex justify-center 2xl:order-1">
              <div className="w-full h-[400px] md:h-[500px]">
                <div ref={mapContainerRef} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
