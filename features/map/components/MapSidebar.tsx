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
import { Menu, X } from "lucide-react";
import LayerCheckboxes from "./MapCheckbox";
import { LayerGroup } from "@/types/map-ui";

import { useEffect } from "react";

interface Polygon {
  id: string | number;
  name: string;
  geometry: any;
}

interface MapSidebarProps {
  layerGroups: LayerGroup[];
  initialExpandedGroups?: string[];
  polygons: Polygon[];
  selectedPolygon: string | null;
  onPolygonSelect: (selectedId: string) => void;
  onToggleLayer: (layerName: string, visible: boolean, url: string, color: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapSidebar: React.FC<MapSidebarProps> = ({
  layerGroups,
  initialExpandedGroups,
  polygons,
  selectedPolygon,
  onPolygonSelect,
  onToggleLayer,
  sidebarOpen,
  setSidebarOpen,
}) => {
    // Set initial sidebar state based on screen size
    useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Show sidebar for large screens
        } else {
        setSidebarOpen(false); // Hide sidebar for small screens
        }
    };

    // Run on component mount
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <div className="absolute top-2 left-2 z-10">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded shadow"
            aria-label="Open Sidebar"
          >
            <Menu size={16} />
          </button>
        )}
      </div>

      {/* Sidebar Panel */}
      <div
        className={`
          bg-white w-80 border-r shadow-md p-4 z-20 transition-transform duration-300
          flex flex-col max-h-screen overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          absolute top-0 bottom-0
        `}
        style={{ height: "calc(100vh - 4rem)" }} // 4rem = 64px
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold">Inhalte</h4>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 bg-gray-100 rounded shadow"
            aria-label="Close Sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <hr className="mr-1" />

        {/* Polygon Dropdown */}
        <div className="mb-4 mt-2">
          <select
            id="polygon-select"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            onChange={(e) => onPolygonSelect(e.target.value)}
            value={selectedPolygon || ""}
          >
            <option value="all">Gesamt Kaiserslautern</option>
            {polygons.map((polygon) => (
              <option key={polygon.id} value={polygon.id} className="text-xs">
                {polygon.name}
              </option>
            ))}
          </select>
        </div>

        <hr className="mr-1" />

        {/* Layer Checkboxes */}
        <div className="overflow-y-auto pr-1 flex-grow">
          <LayerCheckboxes
            layerGroups={layerGroups}
            initialExpandedGroups={initialExpandedGroups}
            onToggleLayer={onToggleLayer}
          />
        </div>
      </div>
    </>
  );
};

export default MapSidebar;
