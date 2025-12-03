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

export default function HeaderSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative backdrop-blur-md bg-white border-b border-white/10 shadow-md">

      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        src="./videos/bg-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* md:min-h-full  */}
      <div className="relative z-10 mx-auto max-w-xl lg:max-w-5xl md:px-8 lg:px-8 text-main-dark ">
        <div className="flex items-center min-h-screen md:mx-8">
          <div className="max-w-xl md:max-w-none lg:flex lg:items-left md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-16 md:space-y-0">
            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-xl lg:max-w-5xl px-4 md:px-8 lg:px-8 text-main-dark">
              <div className="flex items-center min-h-screen">
                <div className="w-full max-w-xl md:max-w-none lg:flex lg:items-start md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-8 md:space-y-0">
                  {/* Content */}
                  <div className="text-center lg:text-center opacity-100 w-full">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
                      Lautrer Wissen
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-4xl mb-8 font-semibold pt-4">
                      Herzlich willkommen beim Lautrer Wissen – dem Wissensportal der Stadt
                      Kaiserslautern: Hier finden Sie offene Daten, aktuelle Veranstaltungen,
                      Statistiken, Baustellen und mehr anschaulich aufbereitet.
                    </p>

                    <div className="pt-8 sm:pt-16 p-2">
                      <span className="flex text-base font-semibold justify-center mb-2">
                        Beliebte Seiten:
                      </span>
                      <div className="flex flex-wrap justify-center gap-2">
                        <a
                          className="px-2 py-1 shadow rounded-lg border text-white text-sm bg-main-dark hover:bg-gray-400"
                          href="/constructionSites"
                        >
                          Baustellen
                        </a>
                        <a
                          className="px-2 py-1 shadow rounded-lg border text-white text-sm bg-main-dark hover:bg-gray-400"
                          href="/map?category=citylife"
                        >
                          Themenkarte
                        </a>
                        <a
                          className="px-2 py-1 shadow rounded-lg border text-white text-sm bg-main-dark hover:bg-gray-400"
                          href="/dashboards"
                        >
                          Sensorik/Dashboards
                        </a>
                        <a
                          className="px-2 py-1 shadow rounded-lg border text-white text-sm bg-main-dark hover:bg-gray-400"
                          href="/#districts_section"
                        >
                          Ortsbezirke
                        </a>
                        <a
                          className="px-2 py-1 shadow rounded-lg border text-white text-sm bg-main-dark hover:bg-gray-400"
                          href="/about"
                        >
                          FAQs
                        </a>
                      </div>
                    </div>
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