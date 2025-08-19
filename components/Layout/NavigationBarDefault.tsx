
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
      { name: 'Themenkarte Kultur', href: '/map?category=tourism' },
      { name: 'Veranstaltungen', href: '/events' },
    ],
  },
  category2: {
    label: 'Wohnen & Leben',
    subcategories: [
      { name: 'Themenkarte Wohnen', href: '/map?category=leisure' },
      { name: 'Solarkaster (extern)', href: 'https://geoportal.kaiserslautern.de/solar/' },
      { name: '3D Karte (extern)', href: 'https://rheinland-pfalz-in-3d.rlp.de/?35Oqiq64CKwk85tUEx94Ckp0B4pe7K63a6Zj000000' },
    ],
  },
  category3: {
    label: 'Verkehr',
    subcategories: [
      { name: 'Themenkarte Verkehr', href: '/map?category=mobility' },
      { name: 'Aktuelle Baustellen', href: '/constructionSites' },
    ],
  },
  category4: {
    label: 'Bürger',
    subcategories: [
      { name: 'Themenkarte Umwelt', href: '/map?category=environment' },
      { name: 'Ratssitzungen', href: '/events_council' },
      { name: 'Wahlergebnisse', href: '/elections' },
      { name: 'Demographie', href: '/demographics' },
    ],
  },
};


const NavigationBarDefault = () => {
  return <NavigationBar categories={defaultCategories} />;
};

export default NavigationBarDefault;