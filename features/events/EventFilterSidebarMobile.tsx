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

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { EventFilterSidebarContent } from "./EventFilterSidebarContent";

export const EventFilterSidebarMobile = (props: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="block md:hidden bg-gray-100 p-3 border rounded-lg shadow-md">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="font-semibold text-gray-600">
          Veranstaltungen filtern
        </h2>
        {expanded ? <ChevronUp /> : <ChevronDown />}
      </div>

      {expanded && (
        <div className="mt-3">
          <EventFilterSidebarContent {...props} />
        </div>
      )}
    </div>
  );
};
