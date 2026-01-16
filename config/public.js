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

const publicConfig = {
    apiBackend: process.env.NEXT_PUBLIC_API_BACKEND,
    apiWebSocketEndpoint: process.env.NEXT_PUBLIC_API_WEBSOCKET_ENDPOINT,
    plausible: {
        domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN, 
        src: process.env.NEXT_PUBLIC_PLAUSIBLE_SRC, 
    },
    dataSourceUrls: {
        geoportal: process.env.NEXT_PUBLIC_URL_GEOPORTAL,
        event_calendar: process.env.NEXT_PUBLIC_URL_EVENT_CALENDAR,
        ris_calendar: process.env.NEXT_PUBLIC_URL_RIS_CALENDAR,
        wga_calendar: process.env.NEXT_PUBLIC_URL_WGA_CALENDAR,
    },
    emailAddressContact: process.env.NEXT_PUBLIC_EMAIL_ADDRESS_CONTACT
};

export default publicConfig;