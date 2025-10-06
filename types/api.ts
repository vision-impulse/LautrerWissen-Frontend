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

export interface EventLeisure {
  id: number;
  type: number;
  deleted: number;
  upcoming: number;
  caption: string;
  caption_addition: string;
  icon: string;
  teaser: string | null;
  description: string;
  tags: string | null;
  tickets: number;
  category: string;
  location_id: number;
  location_name: string;
  location_street: string;
  location_pobox: number;
  location_city: string;
  dstart: string;
  dend: string;
  created: string;
  updated: string;
}

export interface EventWGA {
  id: number;
  data_source: string;
  data_acquisition_date: string;
  city_district_name: string;
  insert_timestamp: string;
  event_id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  subtitle: string;
  description: string;
  city: string;
  postal_code: string;
  street: string;
  location_url: string;
  location_image: string;
  location_id: string;
  sublocation: string;
  event_url: string;
  youtube_video: string;
  group_id: string;
  date_iso: string;
}

export interface EventCouncil {
    id: number;
    committee: string;
    date: string;
    time: string;
    location: string;
    category: string;
    title: string;
    link: string;
}

export interface ConstructionSite {
  id: number;
  data_source: string;
  data_acquisition_date: string; // ISO date: "YYYY-MM-DD"
  city_district_name: string;
  insert_timestamp: string; // ISO timestamp
  gml_id: string;
  gid: string;
  bez: string;
  baustart: string; // "YYYY-MM-DD"
  baustarttxt: string;
  bauende: string; // "YYYY-MM-DD"
  bauendetxt: string;
  txt: string | null;
  strasse: string;
  ortsteil: string;
  ort: string;
  anm: string;
  ansprech: string | null;
  email: string;
  telefon: string | null;
  uml: string;
  erfasser: string;
  erfassertxt: string;
  geplant: string; // "false" as string, maybe convert to boolean?
  rw: number;
  hw: number;
  geox: number;
  geoy: number;
  pdflink: string | null;
  geometry: string;
}

export interface GroupedResult {
  id: number;
  name: string;
  result_data: string; // JSON stringified ElectionResult
}

export interface ElectionApiResponse {
  id: number;
  name: string;
  date: string;
  data_source: string;
  insert_timestamp: string;
  results_grouped: {
    GEMEINDE: GroupedResult[];
    STADTTEIL: GroupedResult[];
    BRIEFWAHLBEZIRK: GroupedResult[];
    //ORTSBEZIRKE?: GroupedResult[]; // Optional in case not present
  };
}

export interface DemographicDataItem {
  id: number;
  city_district_id: number;
  city_district_name: string;
  age_group: string;
  gender: 'männlich' | 'weiblich' | 'divers' | 'ohne Angabe';
  number: number;
  reporting_date: string;
}

export interface DistrictAPIResponse {
  id: number;
  name: string;
}

export interface DemographicApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DemographicDataItem[];
}

export interface GrafanaDashboardListItem {
  dashboard_url: string;
  size_radius_meters: number;
  timefilters: string;
  id: number;
  name: string;
  data_source: string;
  city_district_name: string;
  geometry: string;
  data_acquisition_date: string;
  insert_timestamp: string;
  description?: string;
}

export interface GrafanaDashboardAPIResponse {
    properties: {
      Objektart: string;
      Name: string;
      dashboard_url: string;
      size_radius_meters: number;
      timefilters: string;
      id: number;
    };
  }

export interface SidebarSublayer {
  name: string;
  visible: boolean;
  url: string;
  legendurl?: string;
}

export interface SidebarLayer {
  name: string;
  visible: boolean;
  color: string;
  url: string;
  sublayers: SidebarSublayer[];
  legendurl?: string;
}

export interface SidebarLayerGroup {
  title: string;
  color: string;
  layers: SidebarLayer[];
}

export interface SidebarApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SidebarLayerGroup[];
}

export interface ImageInfo {
  url: string;
  author_name: string;
  license_url: string;
  license_text: string;
}

export interface WikiObjectDetailPageAPIRepsonse {
  id: number;
  fields_to_display: Record<string, string>; // Dynamic key-value pairs for flexibility
  references: { ref: string; link: string }[];
  wikipedia_link: string;

  coordinate: { latitude: number; longitude: number };
  
  image_info: {
    image_url: string;
    image_author_name: string;
    image_license_url: string;
    image_license_text: string;
    image_additional_info?: ImageInfo[];
  };

  object_type: string;
  nearby_objects: { id: number; name: string; distance: number }[];
}

export interface WikiObjectsModelAPIResponse {
  id: number;
  name: string;
  image_url: string;
  image_license_url: string;
  image_license_text: string;
  image_author_name: string;
  city_district_name: string;
}

export interface PartyResult {
    Name: string;
    Direktstimme: string | null;
    Zweitstimme: string | null;
  };
