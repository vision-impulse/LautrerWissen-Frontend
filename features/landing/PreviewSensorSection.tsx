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

import DashboardPreview from '@/assets/images/Preview_grafana_dashboard.png'


export default function PreviewSensorSection() {
  return (
  <section className="bg-white">
  <div className="py-28 radius-for-skewed ">
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap mx-auto 2xl:flex-nowrap items-center">

        <div className="w-full mx-auto 2xl:w-1/2 flex justify-center order-2 2xl:order-1">
          <a href="/dashboards/25">
            <Image
            alt="Map"
            className="object-contain p-2 border rounded"
            src={DashboardPreview}
            />
            </a>
        </div>

        <div className="w-full 2xl:w-1/2 mx-auto 2xl:max-w-xl mb-8 xl:mb-0 order-1 2xl:order-2">
          <div className="mx-4 md:mx-24 lg:pb-8">
            <span className="text-main-dark font-bold">Umweltsensoren und Dashboards</span>
            <h2 className="my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">Live-Sensorik</h2>
            <p className="mb-6 text-gray-700 leading-loose">Das Lautrer Wissen stellt Sensordashboards und Echtzeitdaten von Umweltsensoren dar. Die Daten sind von der Open-Data Plattform der Stadt KL, sowie externen Schnittstellen eingebunden. Über die Themenkarten können folgende Punkte eingesehen werden:</p>
            <ul className="text-gray-700 m-3 list-disc list-inside">
              <li className="mb-4">
                <span>Umweltsensoren und Wetterstationen in KL</span>
              </li>
              <li className="mb-4">
                <span>Aktuelle Wassertemperatur Waschmühle</span>
              </li>
              <li className="mb-4">
                <span>Aktueller Pegelstand des Eselsbachs</span>
              </li>
              <li className="mb-4">
                <span>Live-Messwerte der jeweiligen Sensoren</span>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
  </section>
  );
}