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

import EventPreview from '@/assets/images/Preview_events.png'


export default function PreviewEventSection() {
  return (
  <section className="">
  <div className="py-28 radius-for-skewed ">
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap mx-auto 2xl:flex-nowrap items-center">

        <div className="w-full 2xl:w-1/2 mx-auto 2xl:max-w-xl mb-8 xl:mb-0 ">
          <div className="mx-4 md:mx-16 lg:pb-8">
            <span className="text-main-dark font-bold">Veranstaltungskalender und Meldungen</span>
            <h2 className="my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">Veranstaltungen im Überblick</h2>
            <p className="mb-4 text-gray-700 leading-loose">Im Lautrer Wissen sind aktuelle Veranstaltungen und Verkehrsmeldungen rund um Kaiserslautern aus verschiedenen Datenquellen eingebunden. Über Suchbegriffe und vordefinierte Kategorien können diese schnell und einfach gefunden werden. </p>
            <ul className="text-gray-700 m-3 list-disc list-inside">
              <li className="mb-4">
                <span>Veranstaltungskalender der Stadt KL</span>
              </li>
              <li className="mb-4">
                <span>Veranstaltungskalender (externe Quellen)</span>
              </li>
              <li className="mb-4">
                <span>Kalender Ratssitzungen</span>
              </li>
              <li className="mb-4">
                <span>Meldungen Baustellen und Sperrungen</span>
              </li>

            </ul>
          </div>
        </div>

        <div className="w-full mx-auto 2xl:w-1/2 flex justify-center">
          <a href="/events">
            <Image
            alt="Map"
            className="object-contain p-2 border rounded bg-white"
            src={EventPreview}
            />
          </a>
        </div>

      </div>
    </div>
  </div>
  </section>
  );
}