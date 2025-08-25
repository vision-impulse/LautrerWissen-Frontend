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

import "@/assets/globals.css"
import SubNavHeader from "@/components/Layout/SubNavHeader";

export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grow">
      <SubNavHeader breadcrumbs={[
        { label: 'Startseite', href: '/' },
        { label: 'About', href: '' },
      ]} />
      {children}
    </div>
  );
}
