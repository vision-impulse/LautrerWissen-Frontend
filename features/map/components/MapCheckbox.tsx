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

"use client";

import { useState } from "react";
import { LayerGroup, LayerState, LayerAttribution } from "@/types/map-ui";
import { usePlausible } from "@/hooks/usePlausible";


interface LayerCheckboxesProps {
  layerGroups: LayerGroup[];
  onToggleLayer: (layerName: string, visible: boolean, url: string, color: string, legendUrl?: string, attribution?: LayerAttribution) => void;
  initialExpandedGroups?: string[];
}

const LayerCheckboxes = ({ layerGroups, onToggleLayer, initialExpandedGroups }: LayerCheckboxesProps) => {
  const plausible = usePlausible();
  const [layerStates, setLayerStates] = useState(() => {
    const initialState: Record<string, LayerState> = {};
    layerGroups.forEach((group) => {
      Object.assign(initialState, group.layers);
    });
    return initialState;
  });


  const handleCheckboxChange = (layerName: string, checked: boolean) => {
    const url = layerStates[layerName].url;
    const color = layerStates[layerName].color;
    const legendUrl = layerStates[layerName].legendUrl;
    const attribution = layerStates[layerName].attribution;

    // Update state locally
    setLayerStates((prevState) => ({
      ...prevState,
      [layerName]: { ...prevState[layerName], visible: checked },
    }));

    // If the layer has sublayers, iterate over them and call onToggleLayer for each sublayer
    if (layerStates[layerName].subLayers) {
      Object.keys(layerStates[layerName].subLayers!).forEach((subLayerName) => {
        setLayerStates((prevState) => ({
          ...prevState,
          [layerName]: {
            ...prevState[layerName],
            subLayers: {
              ...prevState[layerName].subLayers,
              [subLayerName]: { ...prevState[layerName].subLayers![subLayerName], visible: checked },
            },
          },
        }));

        const subLayerUrl = layerStates[layerName].subLayers![subLayerName].url;
        onToggleLayer(subLayerName, checked, subLayerUrl, color, legendUrl, attribution);
      });
    } else {
      // Notify parent component about the visibility change
      onToggleLayer(layerName, checked, url, color, legendUrl, attribution);
    }
  };

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initialExpandedState: Record<string, boolean> = {};

    layerGroups.forEach((group) => {
      const isExpanded = initialExpandedGroups
        ? initialExpandedGroups.includes(group.title)
        : true;

      initialExpandedState[group.title] = isExpanded;

      if (isExpanded) {
        // only auto-enable first layer for expanded groups
        const firstLayerName = Object.keys(group.layers)[0];
        handleCheckboxChange(firstLayerName, true);
      }
    });

    return initialExpandedState;
  });

  const toggleGroupVisibility = (groupTitle: string) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [groupTitle]: !prevState[groupTitle], // Toggle the visibility
    }));
  };

  const handleSubCheckboxChange = (layerName: string, subLayerName: string, checked: boolean) => {
    const url = layerStates[layerName].subLayers![subLayerName].url;
    const color = layerStates[layerName].color;

    // Update state locally
    setLayerStates((prevState) => ({
      ...prevState,
      [layerName]: {
        ...prevState[layerName],
        subLayers: {
          ...prevState[layerName].subLayers,
          [subLayerName]: { ...prevState[layerName].subLayers![subLayerName], visible: checked },
        },
      },
    }));

    // Notify parent component about the visibility change
    onToggleLayer(subLayerName, checked, url, color);
  };
  return (
    <>
      {layerGroups.map((group, index) => (
        <div key={index}>
          {/* Group Title and Toggle Button */}
          <div className="flex items-center justify-between mb-1 mt-2 mr-1">
            <span className="text-sm sm:text-base text-gray-800 font-semibold">{group.title}</span>
            <button
              onClick={() => toggleGroupVisibility(group.title)}
              className="w-5 h-5 flex items-center justify-center rounded-full text-black bg-gray-200 hover:bg-gray-100 transition duration-200 text-xs"
              aria-label={expandedGroups[group.title] ? "Collapse group" : "Expand group"}
            >
              {expandedGroups[group.title] ? "−" : "+"}
            </button>
          </div>

          <hr className="mr-1" />

          {/* Layers */}
          {expandedGroups[group.title] && (
            <ul className="space-y-2 px-1 mt-1 pb-1">
              {Object.keys(group.layers).map((layerName) => (
                <li key={layerName}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox checked:bg-main-map"
                      checked={layerStates[layerName]?.visible || false}
                      onChange={(e) => {
                        const checked = e.target.checked;

                        handleCheckboxChange(layerName, checked);

                        if (checked) {
                          plausible("MapCheckboxClicked", {
                            props: {
                              name: layerName,
                              checked: checked,
                            },
                          });
                        }
                      }}
                    />
                    <span className="ml-2 text-xs md:text-sm text-gray-600 font-medium">
                      {layerName}
                    </span>
                  </label>

                  {/* SubLayers */}
                  {layerStates[layerName]?.visible && layerStates[layerName].subLayers && (
                    <ul className="pl-6 space-y-2 mt-2">
                      {Object.keys(layerStates[layerName].subLayers!).map((subLayerName) => (
                        <li key={subLayerName}>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox checked:bg-main-map"
                              checked={layerStates[layerName].subLayers![subLayerName]?.visible || false}
                              onChange={(e) => {
                                const checked = e.target.checked;

                                handleSubCheckboxChange(layerName, subLayerName, checked)

                                if (checked) {
                                  plausible("MapCheckboxClicked", {
                                    props: {
                                      name: layerName,
                                      checked: checked,
                                    },
                                  });
                                }

                              }}
                            />
                            <span className="ml-2 text-xs md:text-sm text-gray-600 font-medium">
                              {subLayerName}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
};

export default LayerCheckboxes;