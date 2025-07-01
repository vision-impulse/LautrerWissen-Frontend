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

import { useState, useEffect } from "react";
import Section from '@/components/Tiles/Box';
import EventFilterSidebar from '@/components/DataList/ListFilterSidebar';
import PaginationBar from '@/components/DataList/ListPagination';

import React from "react";
import config from '@/config';
import { useConstrucionSites } from "@/hooks/api/useConstructionSites";
import { useEventFilters } from "@/hooks/useEventFilters";


const categories: string[] | undefined = [];

const ConstructionSiteView = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
    const {
      searchText, setSearchText,
      selectedCategories, setSelectedCategories,
      startDate, setStartDate,
      endDate, setEndDate,
      currentPage, setCurrentPage,
      toggleCategory,
      searchParams,
    } = useEventFilters (categories);
  
    const {
      data: events,
      isLoading,
      error,
      total,
      nextPage,
      prevPage,
    } = useConstrucionSites (searchParams);

  return (
    <div className="w-full">
      <Section
        title="Baustellen in Kaiserslautern"
        footer_date_title=""
        footer_source_title="Geoportal Kaiserslautern"
      >
        <br />
        <div className="flex flex-col md:flex-row w-full gap-4">
          
        {/* Sidebar (20%) */}
        <EventFilterSidebar
            searchText={searchText}
            setSearchText={setSearchText}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            toggleCategory={toggleCategory}
            />
          

          {/* Main Content (80%) */}
          <div className="w-full md:w-4/5 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            {/* Events Table */}
            <div className="flex flex-col grow justify-between h-full">
               <div className="flex flex-col gap-2 flex-grow">
                {events.length > 0 ? (
                  events.map((event) => (
                    <React.Fragment key={event.id}>
                      <div
                        className={`flex flex-col gap-4 border-b border-gray-200 pb-2 hover:bg-gray-50 cursor-pointer ${
                          expandedEvent === event.id ? "bg-gray-100" : ""
                        }`}
                        onClick={() =>
                          setExpandedEvent(expandedEvent === event.id ? null : event.id)
                        }
                      >
                        {/* Row Content */}
                        <div className="flex items-start gap-4 px-3">
                          
                          {/* Details Column */}
                          <div className="flex flex-col">
                            <div className="font-bold text-base text-gray-800">{event.bez} 
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(event.baustart).toLocaleDateString("de-DE", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                            
                          </div>
                        </div>

                        {/* <div className="text-sm text-gray-600">{event.location}</div> Expanded Content                         
                        */}
                        {expandedEvent === event.id && (
                          <div className="mt-1 text-sm text-gray-700 px-3">
                            <p className="text-gray-600 mt-1">
                              <strong>Hier sind wir vor Ort:</strong> {event.ort},{" "}
                            </p>
                            <p className="text-gray-600 mt-1">
                              <strong>Baubeginn:</strong>{" "} {event.baustarttxt}
                            </p>
                            <p className="text-gray-600 mt-1">
                              <strong>Bauende:</strong> {event.bauendetxt}
                            </p>
                            <p className="text-gray-600 mt-1">
                              <strong>Umleitung:</strong> {event.uml}
                            </p>
                            <p className="text-gray-600 mt-1">
                              <strong>Das ist unsere Aufgabe:</strong> {event.anm}
                            </p>
                            <p className="text-gray-600 mt-1">
                              <strong>So gehen wir vor:</strong> {event.txt}
                            </p>
                            
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
