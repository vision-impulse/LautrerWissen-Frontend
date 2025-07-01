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

import { LayerGroup } from '@/types/map-ui';
  
  // Convert HEX to HSL
export function hexToHsl(hex: string): [number, number, number] {
    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;
  
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
  
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    } else {
      s = 0;
    }
  
    return [h, s * 100, l * 100];
  }
  
  // Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    s /= 100;
    l /= 100;
  
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
  
    let r = 0, g = 0, b = 0;
    if (h < 60)       { r = c; g = x; }
    else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; }
    else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; }
    else              { r = c; b = x; }
  
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255),
    ];
  }
  
  // Generate a shade dynamically for a layer
export function generateShade(baseHex: string, index: number, total: number): string {
    const [h, s, l] = hexToHsl(baseHex);
    const lightnessStep = 60 / total;
    const newL = Math.max(20, Math.min(80, l + (index - total / 2) * lightnessStep));
    const [r, g, b] = hslToRgb(h, s, newL);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }
  
  // Assign dynamic colors to layers in a group
export function assignColorsToLayerGroups(
    layerGroups: LayerGroup[],
  ) {
    layerGroups.forEach((group) => {
      const baseColor = group.color || '#000000';
      const layerNames = Object.keys(group.layers);
      layerNames.forEach((layerName, index) => {
        if (group.layers[layerName].color === '#000000') {
          group.layers[layerName].color = generateShade(baseColor, index, layerNames.length);
        }
      });
    });
  }
  