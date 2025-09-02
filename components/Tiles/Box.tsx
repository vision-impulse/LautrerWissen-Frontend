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

const Section = ({ title, footer_date_title, footer_source_title, footer_source_link, children }:
  {
    title: string,
    footer_date_title?: string,
    footer_source_title: string,
    footer_source_link?: string,
    children: React.ReactNode
  }) => (
  <div className="bg-white shadow-sm rounded-xl w-full p-1">
    <header className="px-5 py-2 border-b border-gray-100">
      <h2 className="text-2xl text-center text-main-dark dark:text-main-dark font-bold mb-0">{title}</h2>
    </header>

    <div className="px-2">

      <div className="text-base md:text-base text-gray-800">
        {children}
      </div>

      {footer_source_title && (
        <div className="flex flex-wrap justify-between pb-2">
          <div className="space-x-2 text-xs">
            <span className="text-sm/5 tracking-wide text-main-dark font-bold inline">
              Datenquelle:
            </span>
            {footer_source_link ? (
              <a
                href={footer_source_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm/5 tracking-wide text-main-dark font-normal inline underline hover:text-main-dark-blue"
              >
                {footer_source_title}
              </a>
            ) : (
              <span className="text-sm/5 tracking-wide text-main-dark font-normal inline">
                {footer_source_title}
              </span>
            )}
            {footer_date_title && (
              <span className="text-sm/5 tracking-wide text-main-dark font-normal inline">
                (Stand: {footer_date_title})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  </div>
);

export default Section;