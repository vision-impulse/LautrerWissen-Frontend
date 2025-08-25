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

'use client'

import React from "react";
import { useState, useEffect } from "react";
import Section from '@/components/Tiles/Box';
import PaginationBar from '@/components/DataList/ListPagination';
import SearchDateFilterHorizontal from '@/components/DataList/SearchDateFilterHorizontal';

import { useConstrucionSites } from "@/hooks/api/useConstructionSites";
import { useEventFilters } from "@/hooks/useEventFilters";
import { dataSourceUrls } from '@/config';
import MapObjectView from "@/components/Elements/MapObjectView";

const categories: string[] | undefined = [];


const ConstructionSiteView = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const {
    searchText, setSearchText,
    startDate, setStartDate,
    endDate, setEndDate,
    currentPage, setCurrentPage,
    searchParams,
  } = useEventFilters(categories);

  const {
    data: events,
    isLoading,
    error,
    total,
    nextPage,
    prevPage,
  } = useConstrucionSites(searchParams);
  return (
    <div className="w-full">
      <Section
        title="Baustellen in Kaiserslautern"
        footer_source_title="Geoportal Kaiserslautern"
        footer_source_link={dataSourceUrls.geoportal}
      >
        <div className="w-full gap-4">

          {/* Search Bar */}
          <div className="w-full pt-2">
            <SearchDateFilterHorizontal
              searchText={searchText}
              setSearchText={setSearchText}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
          </ div>

          {/* Main Content */}
          <div className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            {/* Events Table */}
            <div className="flex flex-col grow justify-between h-full">
              <div className="flex flex-col gap-2 flex-grow">
                {events.length > 0 ? (
                  events.map((event) => (
                    <React.Fragment key={event.id}>
                      <div
                        className={`flex flex-col gap-4 border-b border-gray-200 pb-2 hover:bg-gray-50 cursor-pointer ${expandedEvent === event.id ? "bg-gray-100" : ""
                          }`}
                        onClick={() =>
                          setExpandedEvent(expandedEvent === event.id ? null : event.id)
                        }
                      >
                        <div className="flex gap-4 px-3 items-start">
                          {/* Map Column (preview, hidden on small screens) */}
                          {expandedEvent !== event.id && (
                            <div className="hidden md:block w-32 h-24 flex-shrink-0">
                              <MapObjectView position={[event.geox, event.geoy]} height="100%" />
                            </div>
                          )}

                          {/* Details Column */}
                          <div className="flex flex-col">
                            <div className="font-bold text-base text-gray-800">
                              {event.bez} ({event.ort})
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(event.baustart).toLocaleDateString("de-DE", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}{" "}-{" "}
                              {new Date(event.bauende).toLocaleDateString("de-DE", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        {expandedEvent === event.id && (
                          <div className="flex flex-col md:flex-col gap-4 px-3 ">
                            {/* Expanded Details */}
                            <div className="flex-1 mt-1 text-sm text-gray-700">
                              <p className="text-gray-600 mt-1">
                                <strong>Beginn:</strong> {event.baustarttxt}
                              </p>
                              <p className="text-gray-600 mt-1">
                                <strong>Ende:</strong> {event.bauendetxt}
                              </p>
                              <p className="text-gray-600 mt-1">
                                <strong>Beschreibung:</strong> {event.anm}
                                {event.txt}
                              </p>
                              {event.uml && (
                                <p className="text-gray-600 mt-1">
                                  <strong>Umleitung:</strong> {event.uml}
                                </p>

                              )}
                              <p className="text-gray-600 mt-1">
                                <strong>Ort:</strong> {event.ort}
                              </p>
                              <div className="w-full h-64 p-1">
                                <MapObjectView position={[event.geox, event.geoy]} height="100%" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="py-4 text-center text-gray-500">
                    Keine Baustellen für die Suche gefunden.
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              <PaginationBar
                currentPage={currentPage}
                totalEvents={total}
                nextPage={nextPage}
                prevPage={prevPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
        <br />
      </Section>
    </div>
  );
};

export default ConstructionSiteView;
