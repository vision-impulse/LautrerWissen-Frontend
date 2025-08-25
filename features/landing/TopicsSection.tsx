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
import TrafficIcon from '@/assets/images/Verkehr-Mobilitaet.png'
import PoliticsIcon from '@/assets/images/Buerger-Rathaus-Politik.png'
import TourismIcon from '@/assets/images/Tourismus-Kultur-Freizeit.png'

export default function TopicsSection() {
  return (
    <section className="">
      <div className="py-16 radius-for-skewed ">
        <div className="container mx-auto px-4 max-w-screen-xl">

          <div className="flex justify-center items-center p-6">
            <h2 className="text-center text-main-dark my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">
              Wissen nach Themenfeldern
            </h2>
          </div>
          <div className="px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Card Tourismus / Kultur / Freizeit */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Tourismus"
                  className="w-16 h-16 mb-3"
                  src={TourismIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight text-main-dark">
                  Tourismus / Kultur / Freizeit
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../events"
                    className="px-4 py-2 rounded-lg border-solid border-main-light-dark bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Veranstaltungen
                  </a>
                                    <a
                    href="../map?category=cultural"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Kultur
                  </a>
                  <a
                    href="../map?category=leisure"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Freizeit
                  </a>
                    <a
                    href="../map?category=religion"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Religion
                  </a>
                </div>
              </div>

              {/* Card Verkehr / Mobilität */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Verkehr"
                  className="w-16 h-16 mb-3"
                  src={TrafficIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight text-main-dark">
                  Verkehr / Mobilität / ÖPNV
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../constructionSites"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Baustellen
                  </a>
                                      <a
                    href="../map?category=mobility"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Mobilität
                  </a>

                </div>
              </div>

              {/* Card Leben / Wohnen / Umwelt */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Verkehr"
                  className="w-16 h-16 mb-3"
                  src={EnvironmentIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight text-main-dark">
                  Leben / Wohnen / Umwelt
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                                                        <a
                    href="../map?category=bubatz"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Bubatz
                  </a>
                                                        <a
                    href="../map?category=citylife"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Leben in KL
                  </a>
                                                        <a
                    href="../map?category=planning"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Planen und Bauen
                  </a>
                                                        <a
                    href="../map?category=environment"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Umwelt und Natur
                  </a>
                  <a
                    href="../map?category=sensors"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Sensorik
                  </a>
                </div>
              </div>

              {/* Card Bürger / Rathaus / Politik */}
              <div className="mb-8 p-5 shadow rounded-2xl bg-white flex flex-col items-center text-center">
                <Image
                  alt="Verkehr"
                  className="w-16 h-16 mb-3"
                  src={PoliticsIcon}
                />
                <h4 className="text-2xl font-bold font-heading leading-tight text-main-dark">
                  Bürger / Rathaus / Politik
                </h4>
                <div className="pt-4 flex flex-col gap-2 w-full">
                  <a
                    href="../events_council"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Ratssitzungen
                  </a>
                  <a
                    href="../elections"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Wahlen
                  </a>
                  <a
                    href="../demographics"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Demografie
                  </a>
                                                                          <a
                    href="../map?category=education"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Bildung
                  </a>
                                                                          <a
                    href="../map?category=sustainability"
                    className="px-4 py-2 rounded-lg bg-main-dark-blue text-white font-medium hover:bg-main-map"
                  >
                    Karte - Nachhaltigkeit
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