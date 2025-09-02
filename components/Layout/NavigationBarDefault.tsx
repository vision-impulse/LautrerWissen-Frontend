
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
      { name: 'Karte Kultur', href: '/map?category=cultural' },
      { name: 'Karte Freizeit', href: '/map?category=leisure' },
      { name: 'Karte Religion', href: '/map?category=religion' },
    ],
  },
  category2: {
    label: 'Wohnen & Leben',
    subcategories: [
      { name: 'Karte Bildung', href: '/map?category=education' },
      { name: 'Karte Bubatz', href: '/map?category=bubatz' },
      { name: 'Karte Leben in KL', href: '/map?category=citylife' },
      { name: 'Karte Nachhaltigkeit', href: '/map?category=sustainability' },
      { name: 'Karte Planen und Bauen', href: '/map?category=planning' },
      { name: 'Karte Sensorik', href: '/map?category=sensors' },
      { name: 'Karte Umwelt und Natur', href: '/map?category=environment' },
      { name: 'Solarkaster (extern)', href: 'https://geoportal.kaiserslautern.de/solar/' },
      { name: '3D Karte (extern)', href: 'https://rheinland-pfalz-in-3d.rlp.de/?35Oqiq64CKwk85tUEx94Ckp0B4pe7K63a6Zj000000' },
    ],
  },
  category3: {
    label: 'Verkehr',
    subcategories: [
      { name: 'Baustellen', href: '/constructionSites' },
      { name: 'Karte Mobilität', href: '/map?category=mobility' },
    ],
  },
  category4: {
    label: 'Bürger',
    subcategories: [
      { name: 'Demographie', href: '/demographics' },
      { name: 'Ratssitzungen', href: '/events_council' },
      { name: 'Wahlergebnisse', href: '/elections' },
    ],
  },
};


const NavigationBarDefault = () => {
  return <NavigationBar categories={defaultCategories} />;
};

export default NavigationBarDefault;