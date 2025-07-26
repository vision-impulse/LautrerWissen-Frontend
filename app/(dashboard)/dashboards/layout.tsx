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

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="grow max-w-screen-xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
