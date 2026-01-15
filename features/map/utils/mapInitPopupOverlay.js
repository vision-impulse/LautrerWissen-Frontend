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
import { Zoom, Attribution, FullScreen, Rotate } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { Control } from 'ol/control';
import { Tile, } from 'ol/layer';
import { OSM, TileWMS, XYZ } from 'ol/source';
import { centroid as t_centroid } from '@turf/turf';
import { TileGrid } from 'ol/tilegrid';
import publicConfig from '@/config/public';


export function addPopupOverlay(map) {
    const popup = createPopup();
    map.addOverlay(popup);

    let activeWebSocket = null;
    let popupOpenedManually = false;
    let highlightedFeature = null;

    function createPopup() {
        const el = document.createElement('div');
        el.className = 'ol-popup-cust';
        el.style.cssText = `
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: system-ui, sans-serif;
            font-size: 12px;
            background: white;
            line-height: 1.2;
            z-index: 50;
            position = absolute;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 4px 6px;
            border-bottom: 1px solid #f0f0f0;
        `;
        const title = document.createElement('div');
        title.textContent = "Information zum Objekt";
        title.style.cssText = `
            font-size: 12px;
            font-weight: 600;
            padding: 4px 6px;
        `;
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`;
        closeBtn.style.cssText = `
            background: transparent;
            border: none;
            cursor: pointer;
            color: #374151;
            padding: 2px;
        `;
        closeBtn.onclick = () => {
            popup.setPosition(undefined);
            popupOpenedManually = false;
            if (activeWebSocket) { activeWebSocket.close(); activeWebSocket = null; }
        };

        header.appendChild(title);
        header.appendChild(closeBtn);

        const content = document.createElement('div');
        content.className = 'popup-content';
        content.style.cssText = `
            padding: 6px 8px;
            overflow-y: auto;
        `;

        el.appendChild(header);
        el.appendChild(content);

        return new Overlay({
            element: el,
            positioning: 'bottom-left',
            stopEvent: true,
            offset: [0, -15],
        });
    }

    function getPopupCoordinates(geometry) {
        if (geometry.getType() === 'Point') return geometry.getCoordinates();
        if (geometry.getType() === 'Polygon') return t_centroid({ type: 'Polygon', coordinates: geometry.getCoordinates() }).geometry.coordinates;
        return null;
    }

    function generateTable(entries) {
        const fontSize = window.innerWidth < 480 ? '8px' : '12px';
        let html = `<div style="overflow-x:auto; line-height:14px;"><table style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:${fontSize}; font-family:sans-serif;">`;
        entries.forEach(([key, value], idx) => {
            if (typeof value === 'string' && /^https?:\/\//.test(value)) value = `<a href="${value}" target="_blank" style="color:#2563eb; font-weight:500; text-decoration:none;">Weitere Details</a>`;
            else value = `<div style="word-break:break-word; color:#374151;">${value}</div>`;
            const bg = idx % 2 === 0 ? '#f9fafb' : '#ffffff';
            html += `<tr style="background:${bg}"><td style="padding:6px 10px; font-weight:600; color:#4b5563; max-width:30%;">${key}</td><td style="padding:6px 10px;">${value}</td></tr>`;
        });
        html += '</table></div>';
        return html;
    }

    function enrichWithWebSocket(topic, onData) {
        if (activeWebSocket) {
            activeWebSocket.close();
            activeWebSocket = null;
        }
        const ws = new WebSocket(`${publicConfig.apiWebSocketEndpoint}`);
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

    function sizeAndRenderPopup(contentHTML) {
        const popupEl = popup.getElement();
        const contentEl = popupEl.querySelector('.popup-content');

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;

        // width depending on screen size
        let width;
        if (screenW < 480) width = Math.floor(screenW * 0.5);
        else width = 600;

        // Measure content height in a hidden div  
        const probe = document.createElement('div');
        probe.style.cssText = `
        position: absolute;
        visibility: hidden;
        font-family: system-ui, sans-serif;
        font-size: 12px;
        line-height: 14px;

        box-sizing: border-box;
        max-width: ${width}px;
        padding: 6px 8px;
        overflow-wrap: break-word;
        word-break: break-word;
        `;
        probe.innerHTML = contentHTML;
        document.body.appendChild(probe);

        let contentW = Math.max(probe.scrollWidth, 300);
        if (contentW > width) contentW = width;

        let contentH = probe.scrollHeight + 15;
        const maxH = Math.floor(screenH * 0.4);
        if (contentH > maxH) contentH = maxH;

        document.body.removeChild(probe);

        const headerH = popupEl.firstChild.getBoundingClientRect().height || 30;
        const popupH = contentH + headerH;

        popupEl.style.width = contentW + 'px';
        popupEl.style.height = popupH + 'px';
        contentEl.style.maxHeight = contentH + 'px';
        contentEl.style.overflowY = 'auto';
        contentEl.innerHTML = contentHTML;

        return { width, height: popupH };
    }

    function computePosition(coordinates, dims) {
        const { width, height } = dims;
        const mapEl = map.getTargetElement();
        const mapRect = mapEl.getBoundingClientRect();

        const pixel = map.getPixelFromCoordinate(coordinates);
        let [px, py] = pixel;

        const GAP = 2;

        // Map offsets (sidebar + header)
        const mapOffsetX = mapRect.left;
        const mapOffsetY = mapRect.top;
        console.log(mapOffsetX, mapOffsetY)

        // Vertical: prefer above point
        let offsetY = -GAP;
        let vPos = 'bottom';
        if (py - height < mapOffsetY + GAP) {
            // not enough space above → place below
            offsetY = GAP;
            vPos = 'top';
        }

        const screenW = window.innerWidth;
        let sidebar_offset; 
        sidebar_offset = 320;
        if (screenW < 480) 
            sidebar_offset = 0;

        // Horizontal: center, but keep fully visible
        let offsetX = 0;
        let hPos = 'center';
        if (px - width / 2 < mapOffsetX + GAP) {
            offsetX = GAP;
            hPos = 'left';
        } else if (px + width / 2 > mapOffsetX + mapRect.width - GAP - sidebar_offset) {
            offsetX = -GAP;
            hPos = 'right';
        }

        popup.setPositioning(`${vPos}-${hPos}`);
        popup.setOffset([offsetX, offsetY]);
        popup.setPosition(coordinates);
    }



    function handleClick(evt) {
        let found = false;
        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
            if (feature.get("nonInteractive")) return false;
            const geometry = feature.getGeometry();
            const properties = feature.getProperties();
            const coordinates = getPopupCoordinates(geometry);
            const ignoredKeys = ['geometry', 'coordinate', 'coordinates', 'type', 'id', 'WSTOPIC'];
            const entries = Object.entries(properties).filter(([k]) => !ignoredKeys.includes(k));
            const originalEntries = [...entries];

            const renderPopup = (extra = []) => {
                const contentHTML = generateTable([...originalEntries, ...extra]);
                const dims = sizeAndRenderPopup(contentHTML); // calculates size AND injects content
                computePosition(coordinates, dims); // position popup fully visible
                popup.getElement().querySelector('.popup-content').innerHTML = contentHTML;
            };

            if (properties.WSTOPIC) {
                enrichWithWebSocket(properties.WSTOPIC, (sensorEntries) => renderPopup(sensorEntries));
                renderPopup();
            } else renderPopup();

            found = true;
            popupOpenedManually = true;
            return true;
        });

        if (!found) {
            popup.setPosition(undefined);
            popupOpenedManually = false;
            if (activeWebSocket) { activeWebSocket.close(); activeWebSocket = null; }
        }
    }

    function handlePointer(evt) {
        if (popupOpenedManually) return;

        let found = false;

        map.forEachFeatureAtPixel(evt.pixel, (feature) => {
            if (feature.get("nonInteractive")) return false;
            const properties = feature.getProperties();
            if (properties.WSTOPIC) return false;

            const geometry = feature.getGeometry();
            const coordinates = getPopupCoordinates(geometry);
            const ignoredKeys = ['geometry', 'coordinate', 'coordinates', 'type', 'id', 'WSTOPIC'];
            const entries = Object.entries(properties).filter(([k]) => !ignoredKeys.includes(k));
            const originalEntries = [...entries];

            if (entries.length === 0) {
                popup.setPosition(undefined);
                return false;
            }

            const renderPopup = (extra = []) => {
                const contentHTML = generateTable([...originalEntries, ...extra]);
                const dims = sizeAndRenderPopup(contentHTML); // calculates size AND injects content
                computePosition(coordinates, dims); // position popup fully visible
                popup.getElement().querySelector('.popup-content').innerHTML = contentHTML;
            };
            renderPopup();
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

