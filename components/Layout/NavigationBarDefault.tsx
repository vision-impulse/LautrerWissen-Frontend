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

'use client';

import NavigationBar from '@/components/Layout/NavigationBar';

const defaultCategories = {
  category1: {
    label: 'Kultur',
    subcategories: [
      { name: 'Veranstaltungen', href: '/events' },
      { name: 'Themenkarte', href: '/map?category=cultural_group' },
    ],
  },
  category2: {
    label: 'Verkehr',
    subcategories: [
      { name: 'Baustellen', href: '/constructionSites' },
      { name: 'KL Navi', href: '/external_links' },
      { name: 'Themenkarte', href: '/map?category=mobility' },
    ],
  },
  
  category3: {
    label: 'Wohnen & Leben',
    subcategories: [
      { name: '3D Karte', href: '/external_links' },
      { name: 'Sensor-Dashboards', href: '/dashboards' },
      { name: 'Solarkataster', href: '/external_links' },
      { name: 'Themenkarte', href: '/map?category=citylife_group' },
    ],
  },
  category4: {
    label: 'Rathaus',
    subcategories: [
      { name: 'Demographie', href: '/demographics' },
      { name: 'KL mit Wirkung', href: '/external_links' },
      { name: 'Ratssitzungen', href: '/events_council' },
      { name: 'Wahlergebnisse', href: '/elections' },
    ],
  },
};

const NavigationBarDefault = () => {
  return <NavigationBar categories={defaultCategories} />;
};

export default NavigationBarDefault;