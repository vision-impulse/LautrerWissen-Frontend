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

import Image from 'next/image'

import EnvironmentIcon from '@/assets/images/Leben-Wohnen-Umwelt.png'
import TrafficIcon from '@/assets/images/Verkehr-Mobilität.png'
import PoliticsIcon from '@/assets/images/Bürger-Rathaus-Politik.png'
import TourismIcon from '@/assets/images/Tourismus-Kultur-Freizeit.png'

export default function TopicsSection() {
  return (
    <section className="">
      <div className="py-20 radius-for-skewed ">
        <div className="container mx-auto px-4 ">

          <div className="flex justify-center items-center p-10">
            <h2 className="text-center my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">
              Wissen nach Themenfeldern
            </h2>
          </div>
          <div className="w-full ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card Tourismus / Kultur / Freizeit */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Tourismus"
                  className="w-24 h-24 mb-3"
                  src={TourismIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight">
                  Tourismus / Kultur / Freizeit
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../map?category=tourism"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Themenkarte
                  </a>
                  <a
                    href="../events"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Veranstaltungen
                  </a>
                </div>
              </div>

              {/* Card Verkehr / Mobilität */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Verkehr"
                  className="w-24 h-24 mb-3"
                  src={TrafficIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight">
                  Verkehr / Mobilität / ÖPNV
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../map?category=mobility"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Themenkarte
                  </a>
                  <a
                    href="../constructionSites"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Baustellen
                  </a>
                </div>
              </div>

              {/* Card Leben / Wohnen / Umwelt */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Verkehr"
                  className="w-24 h-24 mb-3"
                  src={EnvironmentIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight">
                  Leben / Wohnen / Umwelt
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../map?category=leisure"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Themenkarte
                  </a>
                  <a
                    href="https://rheinland-pfalz-in-3d.rlp.de/?35Oqiq64CKwk85tUEx94Ckp0B4pe7K63a6Zj000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map transition-colors"
                  >
                    3D-Karte Kaiserslautern
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 18"
                        fill="currentColor"
                        className="ml-1 h-4 w-4 opacity-100 group-hover:opacity-100" 
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                  </a>
                  <a
                    href="https://geoportal.kaiserslautern.de/solar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Solarkataster Kaiserslautern
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 18 18"
                        fill="currentColor"
                        className="ml-1 h-4 w-4 opacity-100 group-hover:opacity-100" 
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                  </a>
                </div>
              </div>

              {/* Card Bürger / Rathaus / Politik */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Verkehr"
                  className="w-24 h-24 mb-3"
                  src={PoliticsIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight">
                  Bürger / Rathaus / Politik
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../map?category=environment"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Themenkarte
                  </a>
                  <a
                    href="../events_council"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Ratssitzungen
                  </a>
                  <a
                    href="../elections"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Wahlen
                  </a>
                  <a
                    href="../demographics"
                    className="px-4 py-2 rounded-lg bg-main-light-dark text-white font-medium hover:bg-main-map"
                  >
                    Demografie
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}