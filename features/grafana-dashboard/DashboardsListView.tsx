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

import React from "react";
import Section from "@/components/Tiles/Box";
import PaginationBar from '@/components/DataList/ListPagination';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDashboardList } from "@/hooks/api/useGrafanaDashboard";
import { useEventFilters } from "@/hooks/useEventFilters";

const categories: string[] | undefined = [];

const dashboardIcons: Record<string, string> = {
  "HSG-Dashboard-monatlich": '/images/dashboards/HSG_monthly.png',
  "HSG-Dashboard-wöchentlich": '/images/dashboards/HSG_weekly.png',
  "HSG-Dashboard-täglich": '/images/dashboards/HSG_daily.png',
  "Eselsbach-Dashboard-Pegelstand": '/images/dashboards/Eselsbach.png',
  "Waschmühle-Dashboard-Temperatur Schwimmbecken": '/images/dashboards/Waschmuehle.png',
  "Bodenfeuchte-Dashboard-Bodenfeuchte": '/images/dashboards/Bodenfeuchte.png',
  "Baumgesundheit-Dashboard-Bodenfeuchte": '/images/dashboards/Bodenfeuchte.png',
};

const DashboardListView: React.FC = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const {
    searchText, setSearchText,
    startDate, setStartDate,
    endDate, setEndDate,
    currentPage, setCurrentPage,
    searchParams,
  } = useEventFilters(categories);

  const {
    data: dashboards,
    isLoading,
    error,
    total,
    nextPage,
    prevPage,
  } = useDashboardList(searchParams);
  return (
    <div className="w-full">
      <Section
        title="Dashboards in Kaiserslautern"
        footer_source_title="eigene Erhebung (Stadt Kaiserslautern)"
      >
        <div className="w-full gap-4">

          <div className="p-2 py-4">
            <p className="text-base">
              Die integrierten Dashboards bieten eine (meist interaktive) Übersicht über die klimatischen Bedingungen und Entwicklungen in der Stadt Kaiserslautern. Durch die Dashboards ist es möglich, auf einfache Weise die aktuellen Wetterbedingungen zu überprüfen und historische Daten zu analysieren, um klimatische Trends und Veränderungen zu verstehen.
            </p>
          </div>

          {/* Main Content */}
          <div className="w-full p-2 bg-white border border-gray-300 rounded-lg shadow-md">

            {/* Events Table */}
            <div className="flex flex-col grow justify-between h-full">
              <div className="flex flex-col gap-2 flex-grow">
                {dashboards.length > 0 ? (
                  dashboards.map((dashboard) => {
                    const iconKey = `${dashboard.name}-${dashboard.timefilters}`;
                    const iconSrc = dashboardIcons[iconKey]

                    return (
                      <React.Fragment key={dashboard.id}>
                        <div
                          className={`flex flex-col p-2 md:flex-row gap-4 border-b border-gray-200 pb-2 hover:bg-gray-50 cursor-pointer ${expandedEvent === dashboard.id ? "bg-gray-100" : ""
                            }`}
                          onClick={() =>
                            setExpandedEvent(
                              expandedEvent === dashboard.id ? null : dashboard.id
                            )
                          }
                        >
                          {/* Bild-Spalte */}
                          <div className="flex-shrink-0 flex justify-center md:justify-start">
                            <a
                              href={`/dashboards/${dashboard.id}`}
                              className="underline"
                            >
                              <Image
                                src={iconSrc}
                                height="100"
                                width="200"
                                alt={`${dashboard.name} Icon`}
                                className="max-h-36 w-auto object-contain"
                              />
                            </a>
                          </div>

                          {/* Text-Spalte */}
                          <div className="flex flex-col p-1 flex-1 text-center md:text-left items-center md:items-start">
                            <div className="font-bold text-base text-gray-800">
                              {dashboard.name} ({dashboard.timefilters})
                            </div>
                            <div className="flex-1 mt-1 text-sm text-gray-700">
                              <p className="text-gray-600 mt-1">{dashboard.description}</p>
                              <p className="text-gray-600 mt-1">
                                <a
                                  href={`/dashboards/${dashboard.id}`}
                                  className="underline"
                                >
                                  Hier geht es zum Dashboard
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div className="py-4 text-center text-gray-500">
                    Kein Dashboard für die Suche gefunden.
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

export default DashboardListView;
