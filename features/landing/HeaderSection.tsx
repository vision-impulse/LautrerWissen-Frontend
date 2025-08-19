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

export default function HeaderSection() {
  return (
    <section className="relative">
      {/* Dark background  
        [clip-path:polygon(0_0,_5760px_0,_5760px_calc(100%_-_352px),_0_100%)]
        */}
      <div
        className="absolute inset-0 bg-main-dark pointer-events-none z-5 "
        aria-hidden="true"
      ></div>
      <div className="relative mx-auto max-w-xl lg:max-w-5xl md:px-8 lg:px-8">
        <div className="pt-20 pb-20 md:pt-24 md:pb-28 mx-8">
          <div className="max-w-xl md:max-w-none lg:flex lg:items-left md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-16 md:space-y-0">
            {/* Content */}
            <div className="text-center md:min-w-[30rem] lg:text-center">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Lautrer Wissen
              </h2>
              <p className="text-xl lg:text-2xl text-white mb-8">
                Herzlich willkommen beim Lautrer Wissen - der Wissensplattform für spannende und öffentliche Informationen aus der Stadt Kaiserslautern:
                Offene Daten, Veranstaltungen, Statistiken anschaulich aufbereitet.
              </p>

              <div className="flex justify-center space-x-4 mx-auto">
                <a
                  className="btn text-black bg-gray-300 hover:bg-gray-400"
                  href="/#1"
                >
                  Mehr erfahren
                </a>
                <a
                  className="btn text-black bg-gray-300 hover:bg-gray-400"
                  href="https://www.herzlich-digital.de/projekte/lautrer-wissen/"
                  target="_blank"
                >
                  Mehr zum Projekt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}