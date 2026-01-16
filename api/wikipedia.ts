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

import publicConfig from '@/config/public';

// -------------------------------------------------------------------------------- // 
// Fetching details of wiki objects 
// -------------------------------------------------------------------------------- //

async function fetchWikiObjectDetail(apiUrl: string, id: string) {
  const response = await fetch(`${apiUrl}/${id}?format=json`);
  if (!response.ok) throw new Error("Failed to fetch object data");
  const data = await response.json();
  return data.object;
}

export function getWikiFishSculptureDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikifishsculpture`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiCulturalMonumentDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikiculturalmonument`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiNaturalMonumentDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikinaturalmonument`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiFountainDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikifountain`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiRittersteinDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikiritterstein`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiBreweryDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikibrewery`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiStolpersteinDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikistolperstein`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiNaturalReserveDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikinaturalreserve`;
  return fetchWikiObjectDetail(apiUrl, id);
}

export function getWikiSacralBuildingDetails(id: string) {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikisacralbuilding`;
  return fetchWikiObjectDetail(apiUrl, id);
}

// -------------------------------------------------------------------------------- // 
// Fetching lists of wiki objects 
// -------------------------------------------------------------------------------- //

async function fetchWikiObjectList(apiUrl: string) {
  const response = await fetch(`${apiUrl}?format=json`);
  if (!response.ok) throw new Error("Failed to fetch");
  const data = await response.json();
  return data.objects;
}

export function getWikiFishSculptureList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikifishsculpture`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiCulturalMonumentList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikiculturalmonument`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiNaturalMonumentList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikinaturalmonument`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiFountainList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikifountain`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiRittersteinList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikiritterstein`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiBreweryList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikibrewery`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiStolpersteinList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikistolperstein`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiNaturalReserveList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikinaturalreserve`;
  return fetchWikiObjectList(apiUrl);
}

export function getWikiSacralBuildingList() {
  const apiUrl = `${publicConfig.apiBackend}/wiki/wikisacralbuilding`;
  return fetchWikiObjectList(apiUrl);
}