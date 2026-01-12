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

import { useEffect, useState, useRef } from "react";
import { initializeMap } from "@/features/map/utils/mapInit"; // Keep the logic in mapInit
import { Map as OlMap } from "ol";


export function useMap(
  containerRef: React.RefObject<HTMLDivElement | null>,
  onBaseMapLegendChange?: (legendUrl: string | null, label: string) => void
) {
  const [map, setMap] = useState<OlMap | null>(null);

  useEffect(() => {
    if (!map && containerRef && containerRef.current) {
      const mapInstance = initializeMap(containerRef.current, onBaseMapLegendChange);
      if (mapInstance) {
        setMap(mapInstance);
      }
    }
  }, [map, containerRef]);

  return map;
}
