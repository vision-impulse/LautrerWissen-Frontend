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

import Title from '@/components/Elements/Title'

const Section = ({ title, footer_date_title, footer_source_title, children }: 
  { title: string, footer_date_title: string, footer_source_title: string, children: React.ReactNode }) => (
  <div className="bg-white shadow-sm rounded-xl w-full">
    <header className="px-5 py-2 border-b border-gray-100">
      <h2 className="text-2xl text-main-heading dark:text-gray-100 font-bold mb-0">{title}</h2>
    </header>

    <div className="px-4">
      <div className="text-base md:text-base text-gray-800">

        {children}

        </div>
        {/* Data Source */}
        {footer_date_title && footer_source_title && (
        <div className="flex flex-wrap justify-between pt-2 pb-2">
            <div className="space-x-2 text-xs">
            <Title as="h8" className="inline" font="semibold" variant="primary">
               {footer_date_title}
            </Title>
            <Title as="h8" className="inline" font="bold" variant="primary">
              Datenquelle:
            </Title>
            <Title as="h8" className="inline" font="normal" variant="primary">
              {footer_source_title}
            </Title>
            </div>
        </div>
        )}
        {footer_source_title && (
          <div className="flex flex-wrap justify-between pb-2">
          <div className="space-x-2 text-xs">
          <Title as="h8" className="inline" font="bold" variant="primary">
            Datenquelle:
          </Title>
          <Title as="h8" className="inline" font="normal" variant="primary">
            {footer_source_title}
          </Title>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Section;