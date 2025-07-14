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
    const isClient = typeof window !== "undefined";
    if (!isClient) return;

    const mapContainer = mapContainerRef.current;
    if (!mapContainer) {
      console.error("Map container not found");
      return;
    }

    const width = 700;
    const height = 600;

    try {
      const svg = d3
        .select(mapContainer)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", "0 0 700 400")
        .attr("preserveAspectRatio", "xMidYMid meet");

      const projection = d3
        .geoMercator()
        .fitSize([width, height], geojsonData as GeoJSON.FeatureCollection);
      const path = d3.geoPath().projection(projection);

      // Tailwind colors from the configuration
      const fullConfig = resolveConfig(tailwindConfig);
      const colors = {
        mainDark: fullConfig.theme?.colors?.["main-dark"] || "#000000",
        mainStroke: fullConfig.theme?.colors?.["main-map-stroke"] || "#000000",
        hoverFill: fullConfig.theme?.colors?.["main-light"] || "#000000",
    };

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
        .on("click", function (event, d) {
          const url = `./districts/?ID=${d.properties.ID}`;
          window.open(url, "_self");
        });
    } catch (error) {
      console.error("Error rendering d3 map:", error);
    }
  }, []);

  return (
    <section className="py-6 bg-white">
      <div className="py-10 radius-for-skewed">
        <div className="container mx-auto px-4">

          <div className="flex justify-center flex-wrap items-center mx-auto">
            <div className="w-full lg:w-1/2 lg:max-w-lg md:pl-10">
              <div className="w-full lg:w-auto mx-auto overflow-hidden relative">
                <div ref={mapContainerRef}></div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:mb-0 mt-4">
              <div className="mx-4 md:pl-24">
                <div className="max-w-xl md:mx-auto">
                  <span className="text-main-dark font-bold">
                    Erhalten Sie einen gebündelten Überblick
                  </span>
                  <h2 className="my-2 text-4xl lg:text-5xl font-bold font-heading">
                    Lokales Wissen nach Ortsbezirken
                  </h2>
                  <p className="text-gray-500 leading-loose">
                    Statistiken und Daten als Schlüssel zur Smart City: Zahlen,
                    Fakten und Open Data nach unterschiedlichen
                    Themenschwerpunkten im Überblick.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}