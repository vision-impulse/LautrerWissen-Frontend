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

'use client';

import Image from 'next/image'

import SubNavHeader from '@/components/Layout/SubNavHeader';

import Calendar from '@/assets/images/Calendar.jpg'
import Camera from '@/assets/images/Camera.png'
import Stats from '@/assets/images/Stats.jpg'
import Vote from '@/assets/images/Vote.png'

import { useSearchParams } from 'next/navigation';
import geojsonData from '@/assets/polygons.json';

export default function DistrictsView() {
    const searchParams = useSearchParams();
    const ID = searchParams.get('ID');

    const feature = geojsonData.features.find(f => ID !== null && parseInt(ID) === f.properties.ID);
    const name = feature ? feature.properties.Name : "Innenstadt";

    const map_href = ID ? `../map?category=leisure&district_id=${ID}` : '../map?category=leisure';
    const demographics_href = ID ? `../demographics?district_id=${ID}` : '../demographics';
    const elections_href = ID ? `../elections?district_id=${ID}` : '../elections';

    return (
        <div className='grow'>
            <SubNavHeader breadcrumbs={[
                { label: 'Startseite', href: '/' },
                { label: name, href: '' },
            ]} />
            <main className="grow max-w-screen-lg mx-auto">
                <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

                    <div className="sm:flex sm:justify-between sm:items-center mb-4">
                        <div className="mb-4 sm:mb-0">
                            <h1 className="px-2 text-2xl md:text-2xl text-main-dark font-bold pt-6">
                                Willkommen auf der Ortsbezirksseite {name}
                            </h1>
                        </div>
                    </div>
                    <div className='text-black'>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white shadow-sm rounded-xl overflow-hidden">
                                <div className="flex flex-col h-full">
                                    <div className="relative">
                                        <a href={map_href}>
                                            <Image
                                                alt="Camera"
                                                className="w-full max-h-72"
                                                src={Camera}
                                            />
                                        </a>
                                    </div>
                                    <div className="grow flex flex-col p-5">
                                        <div className="grow">
                                            <header className="mb-1">
                                                <a href={map_href}>
                                                    <h3 className="text-lg text-gray-800 font-semibold mb-1">Sehenswertes</h3>
                                                </a>
                                                <div className="text-sm">Wie gut kennen Sie den Ortsbezirk? Wir haben für Sie viele sehenswerte Ecken und Plätze von Kaiserslautern zusammengetragen.</div>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white shadow-sm rounded-xl overflow-hidden">
                                <div className="flex flex-col h-full">
                                    <div className="relative">
                                        <a href={demographics_href}>
                                            <Image
                                                alt="Stats"
                                                className="w-full max-h-72"
                                                src={Stats}
                                            />
                                        </a>
                                    </div>
                                    <div className="grow flex flex-col p-5">
                                        <div className="grow">
                                            <header className="mb-2">
                                                <a href={demographics_href}>
                                                    <h3 className="text-lg text-gray-800 font-semibold mb-1">Statistik</h3>
                                                </a>
                                                <div className="text-sm">Hier finden Sie Nützliches und Wissenswertes rund um das Thema Statistik in Kaiserslautern.</div>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white  shadow-sm rounded-xl overflow-hidden">
                                <div className="flex flex-col h-full">
                                    <div className="relative">
                                        <a href={elections_href}>
                                            <Image
                                                alt="Vote"
                                                className="w-full max-h-72"
                                                src={Vote}
                                            />
                                        </a>
                                    </div>
                                    <div className="grow flex flex-col p-5">
                                        <div className="grow">
                                            <header className="mb-2">
                                                <a href={elections_href}>
                                                    <h3 className="text-lg text-gray-800 font-semibold mb-1">Wahlergebnisse</h3>
                                                </a>
                                                <div className="text-sm">Erfahren Sie Nützliches und Wissenswertes rund um das Thema Wahlen.</div>
                                            </header>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-full md:col-span-6 xl:col-span-6 bg-white shadow-sm rounded-xl overflow-hidden">
                                <div className="flex flex-col h-full">
                                    <div className="relative ">
                                        <a href="../events">
                                            <Image
                                                alt="Calendar"
                                                className="w-full max-h-72"
                                                src={Calendar}
                                            />
                                        </a>
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

                        </div>
                    </div>
                    <br />
                </div>
            </main>
        </div>
    );
}
