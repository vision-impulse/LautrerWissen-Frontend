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

import { EventFilterSidebarContent } from "./EventFilterSidebarContent";

export const EventFilterSidebarDesktop = (props: any) => {
  return (
    <div className="hidden md:block bg-gray-100 p-3 border rounded-lg shadow-md">
      <h2 className="font-semibold text-gray-600 mb-3">
        Veranstaltungen filtern
      </h2>

      <EventFilterSidebarContent {...props} />
    </div>
  );
};