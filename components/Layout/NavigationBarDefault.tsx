
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
    label: 'Wohnen & Leben',
    subcategories: [
      { name: '3D Karte (extern)', href: 'https://rheinland-pfalz-in-3d.rlp.de/?35Oqiq64CKwk85tUEx94Ckp0B4pe7K63a6Zj000000' },
      { name: 'Solarkaster (extern)', href: 'https://geoportal.kaiserslautern.de/solar/' },
      { name: 'Themenkarte', href: '/map?category=citylife_group' },
    ],
  },
  category3: {
    label: 'Verkehr',
    subcategories: [
      { name: 'Baustellen', href: '/constructionSites' },
      { name: 'Themenkarte', href: '/map?category=mobility' },
    ],
  },
  category4: {
    label: 'Rathaus',
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