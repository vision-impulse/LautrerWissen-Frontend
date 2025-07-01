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

import 'ol/ol.css';
import { Map, View, Overlay } from 'ol';
import { Zoom, Attribution, FullScreen, Rotate } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { Control } from 'ol/control';
import { Tile, } from 'ol/layer';
import { OSM, TileWMS, XYZ} from 'ol/source';
import { centroid as t_centroid } from '@turf/turf';
import { TileGrid} from 'ol/tilegrid';
import config from '@/config.js';


const wmsBaseMapCarto = new Tile({
    source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attributions: '© <a href="https://www.carto.com/" target="_blank">CARTO</a>',
        tileSize: 128,
        maxZoom: 22
    }),
    //projection: 'EPSG:3857',
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
      attributions: '<a href="https://www.bkg.bund.de/" target="_blank">CC BY 4.0: © GeoBasis-DE / BKG (2025)</a> <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(CC BY 4.0)</a>',
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
      attributions: '<a href="https://www.bkg.bund.de/" target="_blank">CC BY 4.0: © GeoBasis-DE / BKG (2025)</a> <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">(CC BY 4.0)</a>',
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

  
export function addBaseMapSelector(map) {
    // Create a container for the control
    const controlContainer = document.createElement('div');
    controlContainer.className = 'ol-control base-map-selector';
    
    // Create the button to toggle base map options
    const toggleButton = document.createElement('button');
    toggleButton.className = 'ol-control button toggle-button'; // Add OpenLayers control class
    toggleButton.innerHTML = '&#9776;'; // Use a simple icon (hamburger menu)

    // Create the dropdown menu for base maps
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-menu';
    dropdown.style.display = 'none'; // Hidden by default

    // Add base map options
    const baseMaps = [
        { name: 'Standard (Farbig)', layer: wmsBaseMapColored },
        { name: 'Standard (Grau)', layer: wmsBaseMapGray },
        { name: 'OpenStreetMap', layer: wmsBaseMapOSM },
        { name: 'Carto (Hellgrau) ', layer: wmsBaseMapCarto },
        { name: 'Luftbild', layer: wmsBaseMapDop20 },
    ];

    let currentBaseLayer = baseMaps[0].layer; // Track the currently active base map
    map.addLayer(currentBaseLayer); // Initialize with the first base map

    baseMaps.forEach((baseMap, index) => {
        const option = document.createElement('div');
        option.textContent = baseMap.name;
        option.className = 'dropdown-option';
        //option.style.padding = '4px'; //5
        //option.style.cursor = 'pointer';
        option.addEventListener('click', function () {
            if (currentBaseLayer !== baseMap.layer) {
                // Remove the current base map and add the selected one
                map.removeLayer(currentBaseLayer);
                //map.addLayer(baseMap.layer);
                currentBaseLayer = baseMap.layer;
                map.getLayers().insertAt(0, currentBaseLayer);
            }
            dropdown.style.display = 'none'; // Hide dropdown after selection
        });

        dropdown.appendChild(option);
    });

    // Toggle dropdown visibility on button click
    toggleButton.addEventListener('click', function () {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Append elements to the control container
    controlContainer.appendChild(toggleButton);
    controlContainer.appendChild(dropdown);

    // Add the control to the map
    const baseMapControl = new Control({
        element: controlContainer,
    });
    map.addControl(baseMapControl);


    const isSmallScreen = window.screen.width <= 1024;
    if (isSmallScreen) {
        toggleButton.style.width = '35px';
        toggleButton.style.height = '35px';
        toggleButton.style.fontSize = '16px';
        controlContainer.style.top = '80px'; // Adjust for larger zoom buttons
        controlContainer.style.right = '46px';
    } else {
        toggleButton.style.width = '24px';
        toggleButton.style.height = '24px';
        toggleButton.style.fontSize = '14px';
        controlContainer.style.top = '60px'; // Directly under the zoom buttons
        controlContainer.style.right = '35px';
    }

}

export function addPopupOverlay(map) {
    const popup = createPopup();
    map.addOverlay(popup);

    let activeWebSocket = null;
    let popupOpenedManually = false;

    function createPopup() {
        const el = document.createElement('div');
        el.className = 'ol-popup-cust';
        el.style.cssText = `
            border: 1px solid #cccccc;
            border-radius: 6px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            font-family: Arial, sans-serif;
            font-size: 10px;
            pointer-events: auto;
            background: white;
            word-wrap: break-word;
            position: relative;
        `;
    
        // Close button
        const closeBtn = document.createElement('div');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -9px;
            right: -9px;
            width: 22px;
            height: 22px;
            line-height: 22px;
            text-align: center;
            font-size: 20px;
            background: #fff;
            border-radius: 50%;
            cursor: pointer;
            text-color: #000;
            z-index: 10;
            border: 1px solid #cccccc;
        `;
        closeBtn.onclick = () => {
            popup.setPosition(undefined);
            popupOpenedManually = false;
            if (activeWebSocket) {
                activeWebSocket.close();
                activeWebSocket = null;
            }
        };
    
        // Content container
        const content = document.createElement('div');
        content.className = 'popup-content';
        content.style.cssText = `
            max-height: 60vh;
            overflow-y: auto;
            padding: 4px;
        `;
    
        el.appendChild(closeBtn);
        el.appendChild(content);
    
        return new Overlay({
            element: el,
            positioning: 'bottom-center',
            stopEvent: true,
            offset: [0, -15],
        });
    }
    
    
    function adjustPopupWidth(contentHTML) {
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = `
            position: absolute;
            visibility: hidden;
            white-space: nowrap;
            font-family: sans-serif;
            font-size: 12px;
        `;
        tempDiv.innerHTML = contentHTML;
        document.body.appendChild(tempDiv);
        const contentWidth = tempDiv.offsetWidth;
        document.body.removeChild(tempDiv);
    
        const screenW = window.innerWidth;
        const popupEl = popup.getElement();
        if (screenW < 480) {
            popupEl.style.width = contentWidth > screenW * 0.5 ? '80vw' : 'auto';;
        } else {
            popupEl.style.width = contentWidth > screenW * 0.5 ? '50%' : 'auto';
        }
    }
    
    
    function generateTable(entries) {
        const isSmallScreen = window.innerWidth < 480;
        const fontSize = isSmallScreen ? '8px' : '10px';
    
        let html = `<div style="overflow-x: auto;"><table style="width: 100%; border-collapse: collapse; font-size: ${fontSize};">`;
        entries.forEach(([key, value]) => {
            if (typeof value === 'string' && value.match(/^https?:\/\//)) {
                value = `<a href="${value}" target="_blank" style="color: #1e40af; text-decoration: underline; word-break: break-word;">Link (Hier klicken)</a>`;
            } else {
                value = `<div style="word-break: break-word;">${value}</div>`;
            }
    
            html += `
                <tr>
                    <td style="border: 1px solid #ccc; padding: 0px 3px; font-weight: bold; vertical-align: top;">${key}</td>
                    <td style="border: 1px solid #ccc; padding: 0px 3px;">${value}</td>
                </tr>`;
        });
        html += '</table></div>';
        return html;
    }
    

    function getPopupPosition(geometry) {
        if (geometry.getType() === 'Point') {
            return geometry.getCoordinates();
        }
        if (geometry.getType() === 'Polygon') {
            const geom = { type: 'Polygon', coordinates: geometry.getCoordinates() };
            const centr = t_centroid(geom).geometry.coordinates;
            return centr;
        }
        return null;
    }

    function enrichWithWebSocket(topic, onData) {
        if (activeWebSocket) {
            activeWebSocket.close();
            activeWebSocket = null;
        }
        console.log('Connecting to WebSocket for topic:', config.apiWebSocketEndpoint);
        const ws = new WebSocket(`${config.apiWebSocketEndpoint}`);

        //const ws = new WebSocket('ws://localhost:8002/ws/sensors/');
        activeWebSocket = ws;

        ws.onopen = () => {
            ws.send(JSON.stringify({ topic }));
        };

        ws.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                const sensorData = message.sensor_data;
                const sensorEntries = Object.entries(sensorData).map(([k, v]) => [`Sensorwert: ${k}`, v]);
                onData(sensorEntries);
            } catch (err) {
                console.error('WebSocket parse error:', err);
            }
        };

        ws.onerror = () => console.error('WebSocket error');
    }

    function handleClick(evt) {
        let found = false;

        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
            const properties = feature.getProperties();
            const geometry = feature.getGeometry();
            const coordinates = getPopupPosition(geometry);
            const ignoredKeys = ['geometry', 'coordinate', 'coordinates', 'type', 'id', 'WSTOPIC'];

            let entries = Object.entries(properties).filter(([key]) => !ignoredKeys.includes(key));
            const originalEntries = [...entries];

            const renderPopup = (extra = []) => {
                const content = popup.getElement().querySelector('.popup-content');
                const fullEntries = [...originalEntries, ...extra];
                const tableHTML = generateTable(fullEntries);
                adjustPopupWidth(tableHTML);
                content.innerHTML = tableHTML;
                popup.setPosition(coordinates);
            };

            if (properties.WSTOPIC) {
                enrichWithWebSocket(properties.WSTOPIC, (sensorEntries) => {
                    renderPopup(sensorEntries);
                });
                renderPopup(); // Show immediately, enrich later
            } else {
                renderPopup();
            }

            popupOpenedManually = true;
            found = true;
            return true;
        });

        if (!found) {
            popup.setPosition(undefined);
            popupOpenedManually = false;
            if (activeWebSocket) {
                activeWebSocket.close();
                activeWebSocket = null;
            }
        }
    }

    function handlePointer(evt) {
        if (popupOpenedManually) return;

        let found = false;

        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
            const properties = feature.getProperties();
            if (properties.WSTOPIC) return false;

            const geometry = feature.getGeometry();
            const coordinates = getPopupPosition(geometry);
            const ignoredKeys = ['geometry', 'coordinate', 'coordinates', 'type', 'id', 'WSTOPIC'];
            const validEntries = Object.entries(properties).filter(([key]) => !ignoredKeys.includes(key));

            if (validEntries.length === 0) {
                popup.setPosition(undefined);
                return false;
            }

            const content = popup.getElement().querySelector('.popup-content');
            const tableHTML = generateTable(validEntries);
            adjustPopupWidth(tableHTML);
            content.innerHTML = tableHTML;
            popup.setPosition(coordinates);
            found = true;
            return true;
        });

        if (!found) {
            popup.setPosition(undefined);
        }
    }

    map.on('singleclick', handleClick);
    map.on('pointermove', handlePointer);
}
