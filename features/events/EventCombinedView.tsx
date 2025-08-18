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
import EventFilterSidebar from '@/features/events/ListFilterSidebarDropDown';
import PaginationBar from '@/components/DataList/ListPagination';
import React from "react";
import { useLeisureEvents } from '@/hooks/api/useLeisureEvents';
import { useWGAEvents } from '@/hooks/api/useWGAEvents';
import { useEventFilters } from '@/hooks/useEventFilters';
import { EventLeisure } from "@/types/api";
import { EventWGA } from "@/types/api";


const leisureCategories = [
    "Ausstellungen", "Bühne", "Comedy", "Exkursion", "Film / Kino", "Folk",
    "Jazz", "Kinderfest", "Kirchenmusik", "Klassik", "Kleinkunst", "Konzert",
    "Kulinarisches", "Lesung", "Messen", "Musical", "Musik", "Märkte / Versteigerungen",
    "Neue Musik", "Oper", "Party", "Politik", "Schauspiel", "Sightseeing", "Sonstige",
    "Sport", "Stadt- und Straßenfeste", "Tanz und Ballett", "Vorträge", "Wissenschaft"
];

const wgaCategories = [
    "Konzert", "Party", "Lliteratur", "Comedy", "Bühne", "Sport", "Medien",
    "Sonstige", "Kino", "Für Kinder", "Eintritt frei"
];

type UnifiedEvent = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    category?: string;
    date: string;
    time?: string;
    location: string;
    street?: string;
    postal_code?: string | number;
    city?: string;
    image?: string | null;
    start?: string; // for leisure events
    end?: string;   // for leisure events
    source: "leisure" | "wga";
};

// helper to normalize both event types into UnifiedEvent
const normalizeEvent = (event: EventLeisure | EventWGA): UnifiedEvent => {
    if ("caption" in event) {
        // Leisure event
        return {
            id: String(event.id),
            title: event.caption,
            subtitle: event.caption_addition,
            description: event.description,
            category: event.category,
            date: event.dstart,
            time: "", // not provided separately
            location: event.location_name,
            street: event.location_street,
            postal_code: event.location_pobox,
            city: event.location_city,
            image: event.icon
                ? `https://static.miadi.net/${event.icon}`
                : null,
            start: event.dstart,
            end: event.dend,
            source: "leisure",
        };
    } else {
        // WGA event
        return {
            id: String(event.id),
            title: event.title,
            subtitle: event.subtitle,
            description: event.description,
            category: event.category,
            date: event.date,
            time: event.time,
            location: event.location,
            street: event.street,
            postal_code: event.postal_code,
            city: event.city,
            image: null, // WGA has no icon column
            source: "wga",
        };
    }
};



const EventCalendarCombined = () => {
    const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
    const [dataSource, setDataSource] = useState<"leisure" | "wga">("leisure");

    // pick categories depending on source
    const categories = dataSource === "leisure" ? leisureCategories : wgaCategories;

    useEffect(() => {
        console.log(dataSource);
        // reset pagination + filters when switching data source
        setCurrentPage(1);
        setSearchText("");
        setSelectedCategories([]);
        setEndDate("");
        setStartDate("");
    }, [dataSource]);


    const {
        searchText, setSearchText,
        selectedCategories, setSelectedCategories,
        startDate, setStartDate,
        endDate, setEndDate,
        currentPage, setCurrentPage,
        toggleCategory,
        searchParams,
    } = useEventFilters(categories);

    const leisureQuery = useLeisureEvents(searchParams);
    const wgaQuery = useWGAEvents(searchParams);

    const eventsQuery = dataSource === "leisure" ? leisureQuery : wgaQuery;
    const { data: events = [], total, nextPage, prevPage } = eventsQuery;

    const isValidSubtitle = (s: string) => {
        const invalid = ["nan", "null", "undefined", ""];
        return s && !invalid.includes(s.trim().toLowerCase());
    };

    return (
        <div className="w-full">
            <Section
                title="Veranstaltungen in Kaiserslautern"
                footer_date_title=""
                footer_source_title={dataSource === "leisure"
                    ? "Stadtverwaltung Kaiserslautern (Veranstaltungskalender)"
                    : "Was geht app? (Extern)"
                }
            >
                <br />
                <div className="flex flex-col md:flex-row w-full gap-4">

                    {/* Sidebar */}
                    <div className="w-full md:w-1/5">
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
                            dataSource={dataSource}
                            setDataSource={setDataSource}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-4/5 p-2 bg-white border border-gray-300 rounded-lg shadow-md">
                        <div className="flex flex-col grow justify-between h-full">



                            {/* Events Table */}
                            <div className="flex flex-col gap-2 flex-grow">
                                {events.length > 0 ? (
                                    events.map((rawEvent) => {
                                        const event = normalizeEvent(rawEvent);
                                        return (
                                            <React.Fragment key={event.id}>
                                                <div
                                                    className={`flex flex-col gap-4 border-b border-gray-200 pb-2 hover:bg-gray-50 cursor-pointer ${expandedEvent === event.id ? "bg-gray-100" : ""
                                                        }`}
                                                    onClick={() =>
                                                        setExpandedEvent(expandedEvent === event.id ? null : event.id)
                                                    }
                                                >
                                                    {/* Row Content */}
                                                    <div className="flex items-start gap-4  pl-2">
                                                        {/* Only render image if source has one */}
                                                        {event.image && (
                                                            <div className="w-16 h-16 flex-shrink-0">
                                                                <img
                                                                    src={event.image}
                                                                    alt={event.title}
                                                                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Details Column */}
                                                        <div className="flex flex-col">
                                                            <div className="font-bold text-base text-gray-800 ">
                                                                {event.title}
                                                                {isValidSubtitle(event.subtitle) && (
                                                                    <span> - {event.subtitle}</span>
                                                                )}
                                                            </div>
                                                            <div className="text-sm text-gray-600">
                                                                {new Date(event.date).toLocaleDateString("de-DE", {
                                                                    weekday: "long",
                                                                    year: "numeric",
                                                                    month: "long",
                                                                    day: "numeric",
                                                                })}
                                                            </div>
                                                            <div className="text-sm text-gray-600">{event.location}</div>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Content */}
                                                    {expandedEvent === event.id && (
                                                        <div className="mt-2 text-sm text-gray-700 px-3">
                                                            {isValidSubtitle(event.description) && dataSource == "wga" && (
                                                                <div
                                                                    className="prose"
                                                                    dangerouslySetInnerHTML={{ __html: event.description }}
                                                                />
                                                            )}
                                                            {isValidSubtitle(event.description) && dataSource == "leisure" && (
                                                                <p className="whitespace-pre-line">{event.description}</p>
                                                            )}
                                                            <p className="text-gray-600 mt-2">
                                                                <strong>Ort:</strong> {event.street},{" "}
                                                                {event.postal_code} {event.city}
                                                            </p>
                                                            {event.category && (
                                                                <p className="text-gray-600 mt-2">
                                                                    <strong>Kategorie:</strong> {event.category}
                                                                </p>
                                                            )}
                                                            {event.time && (
                                                                <p className="text-gray-600 mt-2">
                                                                    <strong>Beginn:</strong>{" "}
                                                                    {new Date(event.date + "T" + event.time).toLocaleTimeString("de-DE")}
                                                                </p>
                                                            )}
                                                            {event.start && (
                                                                <p className="text-gray-600 mt-2">
                                                                    <strong>Beginn:</strong>{" "}
                                                                    {new Date(event.start).toLocaleTimeString("de-DE")}
                                                                </p>
                                                            )}
                                                            {event.end && (
                                                                <p className="text-gray-600 mt-2">
                                                                    <strong>Ende:</strong>{" "}
                                                                    {new Date(event.end).toLocaleTimeString("de-DE")}
                                                                </p>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        );
                                    })
                                ) : (
                                    <div className="py-4 text-center text-gray-500">
                                        Keine Veranstaltungen für die Suche gefunden.
                                    </div>
                                )}
                            </div>


                            {/* Pagination */}
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

export default EventCalendarCombined;
