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

import privateConfig from '@/config/private';

export type EventsParams = {
    page?: number;
    search?: string;
    category?: string[];
    startDate?: string;
    endDate?: string;
  };

/**
 * Generic function to fetch events from any endpoint.
 * @param endpoint - The API path (e.g. '/events/leisure/')
 * @param params - The filter and pagination parameters
 */
export const fetchEvents = async (
    endpoint: string,
    params: EventsParams
  ) => {
    const searchParams = new URLSearchParams({
      page: params.page?.toString() || "1",
      search: params.search || "",
      category: params.category?.join(",") || "",
      start_date: params.startDate || "",
      end_date: params.endDate || "",
    });
  
    const response = await fetch(`${privateConfig.apiBackend}${endpoint}?${searchParams.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch events");
  
    return response.json();
  };

export const getEventsLeisure = async (params: EventsParams) => {
    return fetchEvents(`/events/leisure/`, params);
};

export const getEventsWGA = async (params: EventsParams) => {
    return fetchEvents(`/events/wga/`, params);
};

export const getEventsCouncil = async (params: EventsParams) => {
    return fetchEvents(`/events/council/`, params);
};