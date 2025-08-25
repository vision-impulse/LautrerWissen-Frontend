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

import { ElectionApiResponse, PartyResult } from "@/types/api";
import config from '@/config';

export const electionSummaryNameMap: Record<string, string> = {
  "Wahlberechtigte gesamt": "Wahlberechtigte gesamt",
  "Waehler gesamt": "Wähler gesamt",
  "Ungueltige Stimmen": "Ungültige Stimmen",
  "Gueltige Stimmen": "Gültige Stimmen",
};

export function normalizeResults(data: PartyResult[]): PartyResult[] {
  return data.map((item) => ({
    ...item,
    Name: electionSummaryNameMap[item.Name] ?? item.Name, // replace if mapped, else keep
  }));
}

export const getElectionResults = async (electionId: number): Promise<ElectionApiResponse> => {
  const response = await fetch(`${config.apiBackend}/elections/${electionId}/?format=json`);
  if (!response.ok) throw new Error("Failed to fetch election data");
  return response.json();
};

export const getAllElections = async (): Promise<ElectionApiResponse[]> => {
  const response = await fetch(`${config.apiBackend}/elections/?format=json`);
  if (!response.ok) throw new Error("Failed to fetch elections list");
  const data = await response.json();
  return data.results;
};