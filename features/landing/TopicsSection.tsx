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

export default function TopicsSection() {
  return (
  <section className="">
  <div className="py-10 radius-for-skewed ">
    <div className="container mx-auto px-4 ">
      <div className="flex flex-wrap mx-auto 2xl:flex-nowrap items-center">

        <div className="w-full 2xl:w-1/2 mx-auto 2xl:max-w-xl mb-8 xl:mb-0 ">
          <div className="mx-4 md:mx-24 lg:pb-8">
            <span className="text-main-dark font-bold">Erhalten Sie einen gebündelten Überblick</span>
            <h2 className="my-2 text-4xl font-playfair-display lg:text-5xl font-bold font-heading">Wissen nach Themenfeldern</h2>
            <p className="mb-6 text-gray-500 leading-loose">Statistiken und Daten als Schlüssel zur Smart City: Zahlen, Fakten und Open Data nach unterschiedlichen Themenschwerpunkten im Überblick.</p>
            <ul className="text-gray-500 font-bold m-3">
              <li className="flex mb-4">
                <svg className="mr-2 w-6 h-6 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Interaktive Dashboards</span>
              </li>
              <li className="flex mb-4">
                <svg className="mr-2 w-6 h-6 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Einblicke in Live und Historische Daten</span>
              </li>
              <li className="flex mb-4">
                <svg className="mr-2 w-6 h-6 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Alle Infos für Themenschwerpunkte</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full mx-auto 2xl:w-1/2 flex flex-wrap">

          <div className="w-full md:w-1/2 md:px-4 xl:pl-8 2xl:pl-0">

            {/* Box Tourism */}
          <div className="mb-8 p-5 shadow rounded bg-white">
          <div className="flex items-center space-x-4">        
            <div className="p-2 rounded-lg bg-main-light flex-shrink-0">
              <svg className="w-10 h-10 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="currentColor">
                <path d="M220.6 121.2L271.1 96 448 96l0 96-114.8 0c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24L64 192l0-64 128 0c9.9 0 19.7-2.3 28.6-6.8zM0 128L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L271.1 32c-9.9 0-19.7 2.3-28.6 6.8L192 64l-32 0 0-16c0-8.8-7.2-16-16-16L80 32c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM168 304a88 88 0 1 1 176 0 88 88 0 1 1 -176 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold font-heading leading-tight">Tourismus / Kultur / Freizeit</h4>
            </div>
          </div>
          <div className="pt-3">
            <p>Erfahren Sie mehr über Sehenswertes und aktuelle Veranstaltungen.</p>
            <ul className="ml-4 mt-1 list-disc">
            <li className='hover:underline text-main-link'><a href="../map?category=tourism">Themenkarte</a></li>
            <li className='hover:underline text-main-link'><a href="../events">Veranstaltungen</a></li>
            </ul>
          </div>
            </div>

            {/* Box Traffic */}
            <div className="mb-8 p-5 shadow rounded bg-white">
              <div className="flex items-center space-x-4">        
                <div className="p-2 rounded-lg bg-main-light flex-shrink-0">
                  <svg className="w-10 h-10 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M384 192h-64v-37.9c37.2-13.2 64-48.4 64-90.1h-64V32c0-17.7-14.3-32-32-32H96C78.3 0 64 14.3 64 32v32H0c0 41.7 26.8 76.9 64 90.1V192H0c0 41.7 26.8 76.9 64 90.1V320H0c0 42.8 28.3 78.7 67 91.1C79.4 468.7 130.6 512 192 512s112.6-43.3 125-101C355.8 398.7 384 362.8 384 320h-64v-37.9c37.2-13.2 64-48.4 64-90.1zM192 416c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-128c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-128c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z" 
                    fill="#000000"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold font-heading leading-tight">Verkehr / Mobilität</h4>
                </div>
              </div>
              <div className="pt-2">
                <p>Erhalten Sie einen Überblick über Mobilitätsdaten zu aktuellen Bausellen, Ladestationen und den ÖPNV.</p>
                <ul className="ml-4 mt-1 list-disc">
                  <li className='hover:underline text-main-link'><a href="../map?category=mobility">Themenkarte</a></li>
                  <li className='hover:underline text-main-link'><a href="../constructionSites">Baustellen</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="w-full md:w-1/2 mt-0 2xl:mt-20 md:px-4 xl:pr-8 2xl:pr-0">
            
            {/* Box Environment */}
              <div className="mb-8 p-5 shadow rounded bg-white">
              <div className="flex items-center space-x-4">        
                <div className="p-2 rounded-lg bg-main-light flex-shrink-0">
                  <svg className="w-10 h-10 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="currentColor">
                  <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold font-heading leading-tight">Leben / Wohnen / Umwelt</h4>
                </div>
              </div>
              <div className="pt-3">
                <p>Erhalten Sie einen Überblick zu den Themen rund um das Leben, Bauen und der Umwelt.</p>
                <ul className="ml-4 mt-1 list-disc">
                  <li className='hover:underline text-main-link'><a href="../map?category=leisure">Themenkarte</a></li>
                  <li className='hover:underline text-main-link'><a target="_blank" href="https://rheinland-pfalz-in-3d.rlp.de/?35Oqiq64CKwk85tUEx94Ckp0B4pe7K63a6Zj000000">3D-Karte von Kaiserslautern</a></li>
                  <li className='hover:underline text-main-link'><a target="_blank" href="https://geoportal.kaiserslautern.de/solar/">Solarkataster Kaiserslautern</a></li>
                </ul>
              </div>
            </div>

            {/* Box Council */}
            <div className="mb-8 p-5 shadow rounded bg-white">
              <div className="flex items-center space-x-4">        
                <div className="p-2 rounded-lg bg-main-light flex-shrink-0">
                  <svg className="w-10 h-10 text-main-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" stroke="currentColor">
                  <path d="M480 48c0-26.5-21.5-48-48-48L336 0c-26.5 0-48 21.5-48 48l0 48-64 0 0-72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 72-64 0 0-72c0-13.3-10.7-24-24-24S64 10.7 64 24l0 72L48 96C21.5 96 0 117.5 0 144l0 96L0 464c0 26.5 21.5 48 48 48l256 0 32 0 96 0 160 0c26.5 0 48-21.5 48-48l0-224c0-26.5-21.5-48-48-48l-112 0 0-144zm96 320l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM240 416l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM560 256c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 176l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zM256 304c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32zM112 320l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16zm304-48l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0zm16 112l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold font-heading leading-tight">Bürger / Rathaus / Politik</h4>
                </div>
              </div>
              <div className="pt-3">
                <p>Verschaffen Sie sich einen Überblick über Wahlergebnisse, Statistiken und Neuigkeiten.</p>
                <ul className="ml-4 mt-1 list-disc">
                  <li className='hover:underline text-main-link'><a href="../map?category=environment">Themenkarte</a></li>
                  <li className='hover:underline text-main-link'><a href="../events_council">Ratssitzungen</a></li>
                  <li className='hover:underline text-main-link'><a href="../elections">Wahlen</a></li>
                  <li className='hover:underline text-main-link'><a href="../demographics">Demographie</a></li>
                </ul>
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