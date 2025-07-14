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

import EventScreenshot from '@/assets/images/Preview_demographics.png'


export default function PreviewStatisticsSection() {
  return (
  <section className="">
  <div className="py-28 radius-for-skewed ">
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap mx-auto 2xl:flex-nowrap items-center">

        <div className="w-full 2xl:w-1/2 mx-auto 2xl:max-w-xl mb-8 xl:mb-0 ">
          <div className="mx-4 md:mx-24 lg:pb-8">
            <span className="text-main-dark font-bold">Zahlen, Tabellen und Statistiken</span>
            <h2 className="my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">Statistiken</h2>
            <p className="mb-4 text-gray-700 leading-loose">Im Lautrer Wissen sind öffentliche Statistikdaten der Stadt KL und die Ergebnisse der letzten Wahlen integriert. Die Daten sind nach Stadt- bzw. Ortsbezirk gruppiert, aufbereitet und in verschieden Ansichten interaktiv dargestellt. Folgende Informationen können eingesehen werden:</p>
            <ul className="text-gray-700 m-3 list-disc list-inside">
              <li className="mb-4">
                <span>Demografische Statistiken</span>
              </li>
              <li className="mb-4">
                <span>Wahlergebnisse (Urnen, Briefwahl)</span>
              </li>

            </ul>
          </div>
        </div>

        <div className="w-full mx-auto 2xl:w-1/2 flex justify-center">
          <a href="/demographics">
            <Image
            alt="Map"
            className="object-contain p-2 border rounded bg-white"
            src={EventScreenshot}
            />
            </a>
        </div>

      </div>
    </div>
  </div>
  </section>
  );
}