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
import { ElectionApiResponse } from "@/types/api";

interface Props {
  apiData: ElectionApiResponse;
  selectedGroup: string;
  selectedId: number | null;
  setSelectedGroup: (group: string) => void;
  setSelectedId: (id: number | null) => void;
}

export const ElectionGroupDropdown: React.FC<Props> = ({
  apiData,
  selectedGroup,
  selectedId,
  setSelectedGroup,
  setSelectedId,
}) => {
  return (
    <div className="mb-0">
      <label className="text-md block mb-1">Ergebnis auswählen</label>
      <select
        value={`${selectedGroup}-${selectedId ?? ""}`}
        onChange={(e) => {
          const [group, idStr] = e.target.value.split("-");
          setSelectedGroup(group);
          setSelectedId(idStr ? Number(idStr) : null);
        }}
        className="text-sm border rounded p-1 w-full"
      >
        <optgroup label="Gesamtergebnis (Gemeinde)">
          {apiData?.results_grouped.GEMEINDE.map((item) => (
            <option key={`GEMEINDE-${item.id}`} value={`GEMEINDE-${item.id}`}>
              {item.name}
            </option>
          ))}
        </optgroup>

        <optgroup label="Stadtteile (Urne)">
          {apiData?.results_grouped.STADTTEIL.map((item) => (
            <option key={`STADTTEIL-${item.id}`} value={`STADTTEIL-${item.id}`}>
              {item.name} (Urne)
            </option>
          ))}
        </optgroup>

        <optgroup label="Briefwahlbezirke">
          {apiData?.results_grouped.BRIEFWAHLBEZIRK.map((item) => (
            <option
              key={`BRIEFWAHLBEZIRK-${item.id}`}
              value={`BRIEFWAHLBEZIRK-${item.id}`}
            >
              {item.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};
