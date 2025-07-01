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

import "@/assets/globals.css";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import Header from '@/components/Layout/Header';
import SubHeader from '@/components/Layout/SubHeader';

import geojsonData from '@/assets/polygons.json';

function CityDistrictLayout({ children }: { children: React.ReactNode }) {

  const searchParams = useSearchParams();
  const ID = searchParams ? searchParams.get('ID') : null;

  //TODO: This is a workaround to get the name of the city district. Load the name from the API!
  let name = "Innenstadt";
  geojsonData.features.map((feature) => {
    if (ID !== null && parseInt(ID) === feature.properties.ID){
      name = feature.properties.Name;
    }
  })

  return (
  <div>
        <Header />

        <div className="top-0 sticky before:absolute before:inset-0 before:backdrop-blur-md before:bg-white/90 lg:before:bg-gray-100/90 before:-z-10 max-lg:shadow-sm z-30">

        <div className="flex flex-wrap items-center justify-end mx-auto h-12 bg-main-light-dark">
          <div className="px-4 sm:px-6 lg:px-6 py-0 md:py-0 w-full max-w-9xl mx-auto">
            <div className="mx-auto w-full max-w-screen-xl">
              <div className="flex md:flex md:justify-between items-center pl-4">
                
                
                  <span className="flex items-center">
                    <span className="self-center text-xl text-white font-semibold whitespace-nowrap pr-8 ">
                      <a href="/">Startseite /</a> {`Ortsbezirk ${name}`}
                    </span>
                  </span>
                
                <div className="hidden md:block">
                  <div className="flex justify-end items-center space-x-1">
                  
                    <div className="px-2 pt-4 md:pt-0">
                      <h2 className="m-1 md:m-3 text-sm font-bold text-white uppercase"><a href="../events">Termine</a></h2>
                    </div>
                    <div className="px-2 pt-4 md:pt-0">
                      <h2 className="m-1 md:m-3 text-sm font-bold text-white uppercase"><a href="../map">Karte</a></h2>
                    </div>
                    <div className="px-2 pt-4 md:pt-0">
                      <h2 className="m-1 md:m-3 text-sm font-bold text-white uppercase"><a href="../elections">Wahlen</a></h2>
                    </div>
                    <div className="px-2 pt-4 md:pt-0">
                      <h2 className="m-1 md:m-3 text-sm font-bold text-white uppercase"><a href="../demographics">Statistik</a></h2>
                    </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <main className="grow max-w-screen-lg mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <div className="mb-4 sm:mb-0">
                    <h1 className="px-2 text-2xl md:text-2xl text-main-link font-bold">
                    </h1>
                </div>
            </div>
            {children}
          </div>
        </main>
</div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityDistrictLayout>{children}</CityDistrictLayout>
    </Suspense>
  );
}
