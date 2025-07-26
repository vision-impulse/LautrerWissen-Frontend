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

import type { MetadataRoute } from 'next'
 

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lautrer Wissen',
    short_name: 'KL-Wissen',
    description: 'The interactive data portal of Kaiserlautern',
    start_url: '/',
    id: 'https://lautrer-wissen.de',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    launch_handler: {
      client_mode: ["navigate-existing", "auto"]
    },
    orientation: 'portrait',
    categories: ["maps", "lifestyle", "news"],
    screenshots: [
      {
        src: '/screenshots/home.png',
        type: 'image/png',
        sizes: '430×930',
        label: 'Startansicht',
      },
      {
        src: '/screenshots/events.png',
        type: 'image/png',
        sizes: '430×930',
        label: 'Veranstaltungsansicht',
      },
      {
        src: '/screenshots/map.png',
        type: 'image/png',
        sizes: '430×930',
        label: 'Kartenansicht',
      },
    ],
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    dir: 'ltr',
    lang: 'de',
    prefer_related_applications: false,
  }
}