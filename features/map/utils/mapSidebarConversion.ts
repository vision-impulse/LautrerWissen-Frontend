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

import { LayerGroup, LayerState, SubLayerState } from "@/types/map-ui";
import { SidebarApiResponse } from "@/types/api";
import publicConfig from '@/config/public';

export const convertSidebarApiToLayerGroups = (
    apiData: SidebarApiResponse
): LayerGroup[] => {
    return apiData.results.map((group) => {
        const layers: Record<string, LayerState> = {};

        group.layers.forEach((layer) => {
            const subLayers: Record<string, SubLayerState> = {};

            layer.sublayers.forEach((sub) => {
                const url = sub.url.startsWith("http://") || sub.url.startsWith("https://")
                    ? sub.url
                    : `${publicConfig.apiBackend}${sub.url}`;
                subLayers[sub.name] = {
                    visible: sub.visible,
                    url: url,
                    legendUrl: sub.legendurl,
                    attribution: layer.attribution
                };
            });

            const layerUrl = layer.url.startsWith("http://") || layer.url.startsWith("https://")
                ? layer.url
                : `${publicConfig.apiBackend}${layer.url}`;

            layers[layer.name] = {
                visible: layer.visible,
                url: layerUrl,
                color: layer.color,
                subLayers: Object.keys(subLayers).length > 0 ? subLayers : undefined,
                legendUrl: layer.legendurl,
                attribution: layer.attribution
            };
        });

        return {
            title: group.title,
            color: group.color,
            layers,
        };
    });
};