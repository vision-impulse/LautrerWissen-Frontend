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


export interface LayerAttribution {
  source?: string;
  license?: string;
  url?: string;
}

export interface SubLayerState {
  visible: boolean;
  url: string;
  legendUrl?: string;
  attribution?: LayerAttribution;
}

export interface LayerState {
  visible: boolean;
  url: string;
  color: string;
  subLayers?: Record<string, SubLayerState>;
  legendUrl?: string;
  attribution?: LayerAttribution;
}

export interface LayerGroup {
  title: string;
  color: string;
  layers: Record<string, LayerState>;
}