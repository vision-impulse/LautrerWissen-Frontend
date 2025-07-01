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

import React from 'react';

interface SubHeaderProps {
  category_name: string;
  sub_categories: string[];
}

const SubHeader: React.FC<SubHeaderProps> = ({ category_name, sub_categories }) => {
  return (
    <div className="top-0 sticky before:absolute before:inset-0 before:backdrop-blur-md before:bg-white/90 lg:before:bg-gray-100/90 before:-z-10 max-lg:shadow-sm z-30">

    <div className="flex flex-wrap items-center justify-end mx-auto h-12 bg-main-light-dark">
      <div className="px-4 sm:px-6 lg:px-6 py-0 md:py-0 w-full max-w-9xl mx-auto">
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="flex md:flex md:justify-between items-center pl-4">
            <div className="hidden md:block">
              <span className="flex items-center">
                <span className="self-center text-xl text-white font-semibold whitespace-nowrap pr-8 ">
                  <a href="/">Startseite /</a> {category_name}
                </span>
              </span>
            </div>
            <div className="flex justify-end items-center space-x-1">
              {sub_categories.map((sub_category, index) => (
                <div key={index} className="px-2 pt-4 md:pt-0">
                  <h2 className="m-1 md:m-3 text-sm font-bold text-white uppercase">
                  <a href={`#${index}`}>
                    {sub_category}
                    </a>
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SubHeader;