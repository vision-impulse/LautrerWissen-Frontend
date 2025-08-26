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

import React, { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const LegendBox: React.FC<{ legends: Record<string, string> }> = ({ legends }) => {
  const [open, setOpen] = useState(true);

  if (Object.keys(legends).length === 0) return null;

  return (
    <div className="absolute bottom-11 right-2 bg-white shadow-md rounded-lg p-3 max-w-xs w-72">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <h3 className="text-sm font-bold text-gray-700">Legende</h3>
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </div>

      {open && (
        <div className="mt-2 space-y-3 max-h-72 overflow-y-auto pr-1">
          {Object.entries(legends).map(([layer, url]) => {
            const lower = url.toLowerCase();

            // PDF → external link only
            if (lower.endsWith(".pdf")) {
              return (
                <div key={layer} className="text-xs">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-main-map hover:underline flex items-center space-x-1"
                  >
                    <span>{layer}</span>
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              );
            }

            // PNG/JPG include directly
            if (
              lower.endsWith(".png") ||
              lower.endsWith(".jpg") ||
              lower.endsWith(".jpeg") ||
              lower.includes("format=image/png") ||
              lower.includes("format=image/jpeg")
            ) {
              return (
                <div key={layer} className="text-xs">
                  <div className="mb-1 font-semibold">{layer}</div>
                  <img
                    src={url}
                    alt={`${layer} legend`}
                    className="max-w-full rounded border"
                  />
                </div>
              );
            }

            // fallback → just show link
            return (
              <div key={layer} className="text-xs">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-map hover:underline flex items-center space-x-1"
                >
                  <span>{layer}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LegendBox;
