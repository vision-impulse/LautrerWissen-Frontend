/**
 * @file This file is part of LautrerWissen
 * @author Benjamin Bischke
 * @copyright 2026 Vision Impulse GmbH
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

import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import { Tile, } from 'ol/layer';
import { OSM, TileWMS, XYZ } from 'ol/source';
import Control from "ol/control/Control";
import TileLayer from "ol/layer/Tile";


interface BaseMapEntry {
  name: string;
  layer: TileLayer<any>;
  legendUrl: string | null;
}

const wmsBaseMapCarto = new Tile({
    source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attributions: '© <a href="https://www.carto.com/" target="_blank">CARTO</a>',
        tileSize: 128,
        maxZoom: 22
    }),
});

const wmsBaseMapDop20 = new Tile({
    source: new TileWMS({
        url: 'https://geo4.service24.rlp.de/wms/rp_dop20.fcgi?',
        attributions: '<a href="https://daten.rlp.de/geodata/87b2d177-c059-c04f-c780-d3ee540c5bde" target="_blank">Landesamt für Vermessung und Geobasisinformationen</a> <a href="https://www.govdata.de/dl-de/by-2-0" target="_blank">(DL-DE/BY-2-0)</a>',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.1.1',
            'LAYERS': 'rp_dop20',
            'FORMAT': 'image/png',
            'SRS': 'EPSG:3857',
            'CRS': 'EPSG:3857',
            'TRANSPARENT': false,
        },
        projection: 'EPSG:3857',
    }),
});

const wmsBaseMapGray = new Tile({
    source: new TileWMS({
        url: 'https://sgx.geodatenzentrum.de/wms_basemapde',
        attributions: '<a href="https://www.bkg.bund.de/" target="_blank">© GeoBasis-DE / BKG (2025)</a><a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(CC BY 4.0)</a>',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'LAYERS': 'de_basemapde_web_raster_grau',
            'FORMAT': 'image/png',
            'SRS': 'EPSG:3857',
            'CRS': 'EPSG:3857',
            'TRANSPARENT': false,
        },
        projection: 'EPSG:3857',
    }),
});

const wmsBaseMapColored = new Tile({
    source: new TileWMS({
        url: 'https://sgx.geodatenzentrum.de/wms_basemapde',
        attributions: '<a href="https://www.bkg.bund.de/" target="_blank">© GeoBasis-DE / BKG (2025)</a> <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(CC BY 4.0)</a>',
        params: {
            'SERVICE': 'WMS',
            'VERSION': '1.3.0',
            'REQUEST': 'GetMap',
            'LAYERS': 'de_basemapde_web_raster_farbe',
            'FORMAT': 'image/png',
            'SRS': 'EPSG:3857',
            'CRS': 'EPSG:3857',
            'TRANSPARENT': false,
        },
        projection: 'EPSG:3857',
    }),
});

const wmsBaseMapOSM = new Tile({
    source: new OSM(),
});


const baseMaps: BaseMapEntry[] = [
  { 
    name: 'Standard (Farbig)', 
    layer: wmsBaseMapColored,
    legendUrl: 'https://basemap.de/data/produkte/web_raster/legende/bm_web_raster_legende_col.png'
  },
  { 
    name: 'Standard (Grau)', 
    layer: wmsBaseMapGray,
    legendUrl: 'https://basemap.de/data/produkte/web_raster/legende/bm_web_raster_legende_gry.png'
  },
  { 
    name: 'OpenStreetMap', 
    layer: wmsBaseMapOSM,
    legendUrl: null
  },
  { 
    name: 'Carto (Hellgrau)', 
    layer: wmsBaseMapCarto,
    legendUrl: null
  },
  { 
    name: 'Luftbild', 
    layer: wmsBaseMapDop20,
    legendUrl: null
  },
];

export function addBaseMapSelector(
  map: Map,
  onLegendChange?: (legendUrl: string | null, label: string) => void
): void {
  const controlContainer = document.createElement('div');
  controlContainer.className = 'ol-control base-map-selector';

  const toggleButton = document.createElement('button');
  toggleButton.className = 'ol-control button toggle-button';
  toggleButton.innerHTML = '&#9776;';

  const dropdown = document.createElement('div');
  dropdown.className = 'dropdown-menu';
  dropdown.style.display = 'none';

  let currentBaseLayer = baseMaps[0].layer;
  map.addLayer(currentBaseLayer);

  // Fire initial legend
  onLegendChange?.(baseMaps[0].legendUrl, baseMaps[0].name);

  baseMaps.forEach((baseMap) => {
    const option = document.createElement('div');
    option.textContent = baseMap.name;
    option.className = 'dropdown-option';

    option.addEventListener('click', function () {
      if (currentBaseLayer !== baseMap.layer) {
        map.removeLayer(currentBaseLayer);
        currentBaseLayer = baseMap.layer;
        map.getLayers().insertAt(0, currentBaseLayer);

        onLegendChange?.(baseMap.legendUrl, baseMap.name);
      }
      dropdown.style.display = 'none';
    });

    dropdown.appendChild(option);
  });

  toggleButton.addEventListener('click', function () {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });

  controlContainer.appendChild(toggleButton);
  controlContainer.appendChild(dropdown);

  const baseMapControl = new Control({
    element: controlContainer,
  });
  map.addControl(baseMapControl);

  const isSmallScreen = window.screen.width <= 1024;
  if (isSmallScreen) {
    toggleButton.style.width = '35px';
    toggleButton.style.height = '35px';
    toggleButton.style.fontSize = '16px';
    controlContainer.style.top = '80px';
    controlContainer.style.right = '46px';
  } else {
    toggleButton.style.width = '24px';
    toggleButton.style.height = '24px';
    toggleButton.style.fontSize = '14px';
    controlContainer.style.top = '60px';
    controlContainer.style.right = '35px';
  }
}
