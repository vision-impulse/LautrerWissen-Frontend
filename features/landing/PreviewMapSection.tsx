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

import MapPreview from '@/assets/images/Preview_map.png'


export default function PreviewMapSection() {
  return (
  <section className="bg-white">
  <div className="py-28 radius-for-skewed ">
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap mx-auto 2xl:flex-nowrap items-center">

        <div className="w-full mx-auto 2xl:w-1/2 flex justify-center order-2 2xl:order-1">
          <a href="/map">
            <Image
            alt="Map"
            className="object-contain p-2 border rounded bg-white"
            src={MapPreview}
            />
          </a>
        </div>
        
        <div className="w-full 2xl:w-1/2 mx-auto 2xl:max-w-xl mb-8 xl:mb-0 order-1 2xl:order-2">
          <div className="mx-4 md:mx-16 lg:pb-8">
            <span className="text-main-dark font-bold">Interaktive Geodatenplattform</span>
            <h2 className="my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">Umfassende Geodatenbasis</h2>
            <p className="mb-4 text-gray-700 leading-loose">Das Lautrer Wissen bündelt Geodaten aus zahlreichen offenen Datenquellen (darunter Daten von OpenStreetMap, den städtischen Geoportalen, Wikipedia, der Bundesnetzagentur, der VRN sowie weitere Schnittstellen) und macht die Daten für alltägliche Fragestellungen einfach zugänglich. </p>
            <ul className="text-gray-700 m-3 list-disc list-inside">
              <li className="mb-4">
                <span>Baustellen, E-Ladestationen, Fahrradständer</span>
              </li>
              <li className="mb-4">
                <span>Bildungsangebote, Freizeitangebote</span>
              </li>
              <li className="mb-4">
                <span>Kulturdenkmale, Sehenswertes, Skulpturen</span>
              </li>
              <li className="mb-4">
                <span>Wifi-Hotspots, Stadtmöbilar, Toiletten</span>
              </li>
              <li className="mb-4">
                <span>Flächennutzungsplan, Baurechtskataster</span>
              </li>
              <li className="mb-4">
                <span>Umweltsensoren, Recycling-Container, Abfalleimer</span>
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