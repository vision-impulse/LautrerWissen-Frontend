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

import Calendar from '@/assets/images/Calendar.jpg'
import Camera from '@/assets/images/Camera.png'
import Stats from '@/assets/images/Stats.jpg'
import Vote from '@/assets/images/Vote.png'

export default async function Home() {
    return (
        <div>
        <div>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white shadow-sm rounded-xl overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="relative ">
                        <Image
                            alt="Calendar"
                            className="w-full"
                            //style={{ width: '301px', maxHeight: '226px' }}
                            src={Calendar}
                          />

                        </div>
                        <div className="grow flex flex-col p-5">
                            <div className="grow">
                                <header className="mb-1">
                                    <a href="../events">
                                        <h3 className="text-lg text-gray-800 font-semibold mb-0">Aktuelle Termine</h3>
                                    </a>
                                    <div className="text-sm">Im Online-Veranstaltungskalender für Kaiserslautern und Umgebung finden Sie Informationen zu wichtigen Terminen und Veranstaltungen.</div>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white shadow-sm rounded-xl overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="relative">
                        <Image
                            alt="Stats"
                            className="w-full"
                            //style={{ width: '301px', maxHeight: '226px' }}
                            src={Stats}
                          />

                        </div>
                        <div className="grow flex flex-col p-5">
                            <div className="grow">
                                <header className="mb-2">
                                    <a href="../demographics">
                                        <h3 className="text-lg text-gray-800 font-semibold mb-1">Statistik</h3>
                                    </a>
                                    <div className="text-sm">Hier finden Sie Nützliches und Wissenswertes rund um das Thema Statistik in Kaiserslautern.</div>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
    
    
                <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white shadow-sm rounded-xl overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="relative">
                        <Image
                            alt="Camera"
                            className="w-full"
                            //style={{ width: '301px', maxHeight: '226px' }}
                            src={Camera}
                          />
                        </div>
                        <div className="grow flex flex-col p-5">
                            <div className="grow">
                                <header className="mb-1">
                                    <a href="../map?category=mobility">
                                        <h3 className="text-lg text-gray-800 font-semibold mb-1">Sehenswertes</h3>
                                    </a>
                                    <div className="text-sm">Wie gut kennen Sie den Ortsbezirk? Wir haben für Sie viele sehenswerte Ecken und Plätze von Kaiserslautern zusammengetragen.</div>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
    
    
                <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white  shadow-sm rounded-xl overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="relative">
                                                <Image
                            alt="Vote"
                            className="w-full"
                            //style={{ width: '301px', maxHeight: '226px' }}
                            src={Vote}
                          />
                        </div>
                        <div className="grow flex flex-col p-5">
                            <div className="grow">
                                <header className="mb-2">
                                    <a href="../elections">
                                        <h3 className="text-lg text-gray-800 font-semibold mb-1">Wahlergebnisse</h3>
                                    </a>
                                    <div className="text-sm">Erfahren Sie Nützliches und Wissenswertes rund um das Thema Wahlen.</div>
                                </header>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
    </div>
  );
}
