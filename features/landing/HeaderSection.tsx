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
        {/* Dark background */}
        <div
          className="absolute inset-0 bg-main-dark pointer-events-none z-5 [clip-path:polygon(0_0,_5760px_0,_5760px_calc(100%_-_352px),_0_100%)]"
          aria-hidden="true"
        ></div>
        <div className="relative mx-auto max-w-xl lg:max-w-5xl md:px-8 lg:px-8">
          <div className="pt-16 pb-16 md:pt-20 md:pb-44 mx-8">
            <div className="max-w-xl md:max-w-none lg:flex lg:items-left md:space-x-8 lg:space-x-16 xl:space-x-20 space-y-16 md:space-y-0">
              {/* Content */}
              <div className="text-left md:min-w-[30rem] lg:text-left">
                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                  Lautrer Wissen
                </h2>
                <p className="text-xl lg:text-2xl text-white mb-8">
                  Willkommen auf dem Wissensportal der Stadt Kaiserslautern. Ihr
                  Wegweiser zum Smart City-Wissen von Kaiserslautern: Themen,
                  öffentlichen Daten und Innovationen auf einen Blick.
                </p>
                <div className="flex justify-start mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
                  <div>
                    <a
                      className="btn text-white bg-slate-800 hover:bg-slate-800 w-full"
                      href="https://www.herzlich-digital.de/projekte/lautrer-wissen/"
                      target="_blank"
                    >
                      Mehr erfahren
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