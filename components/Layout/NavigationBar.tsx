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

import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import React, { useState, useRef } from 'react';
import Image from 'next/image'
import LogoKL from '@/assets/logos/Kaiserslautern.png'

interface NavigationProps {
  categories: {
    [category: string]: {
      label: string;
      subcategories: {
        name: string;
        href: string;
      }[];
    };
  };
}

const NavigationBar: React.FC<NavigationProps> = ({ categories }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Handles the mouse entering a category.
   * Clears any pending mouse leave timeout to keep the submenu open.
   * @param key The key of the category being hovered.
   */
  const handleMouseEnter = (key: string) => {
    // If there's an active timeout from a previous mouse leave, clear it.
    // This prevents the submenu from closing if the mouse briefly leaves and re-enters.
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    // Set the hovered category to display its submenu.
    setHoveredCategory(key);
  };

  /**
   * Handles the mouse leaving a category or its submenu.
   * Sets a short timeout before hiding the submenu. If the mouse re-enters
   * the category/submenu within this delay, the timeout will be cleared
   * by handleMouseEnter, keeping the submenu visible.
   */
  const handleMouseLeave = () => {
    // Set a timeout to hide the submenu after a short delay (e.g., 200ms).
    // This delay is crucial: it allows the mouse to move from the category button
    // to the submenu without the submenu immediately disappearing.
    leaveTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 200);
  };

  return (
    <nav className="top-0 sticky z-40 h-14 bg-main-dark backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="max-w-screen-xl mx-auto px-1 sm:px-6 lg:px-1">
        <div className="flex justify-between h-14 items-center relative">

          {/* Mobile Menu Button + Title Centered */}
          <div className="flex items-center md:hidden w-full justify-between px-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="text-white focus:outline-none"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <a href="/" className="text-xl text-white text-center flex-grow">
              Lautrer Wissen
            </a>
            <div style={{ width: '24px' }} /> {/* Empty space to balance the button size on the right */}
          </div>

          {/* Desktop Title + Logo */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center justify-center h-full pl-2">
              <a href="/" >
                <Image
                  alt="Logo Kaiserslautern"
                  className="object-contain"
                  style={{ height: "60px", width: '60px', maxHeight: '60px' }}
                  src={LogoKL}
                />
              </a>
            </div>
            <a href="/" className="text-xl text-white whitespace-nowrap">
              Lautrer Wissen
            </a>
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex space-x-6 relative z-50">
            {Object.entries(categories).map(([key, value], index, arr) => {
              const isLast = index === arr.length - 1;
              return (
                <div
                  key={key}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className="text-white font-playfair-display text-md hover:text-white focus:outline-none transition-colors py-1 px-3 rounded-md"
                    aria-haspopup="true"
                    aria-expanded={hoveredCategory === key}
                  >
                    {value.label}
                  </button>

                  {/* Submenu: adjust position for last item */}
                  {hoveredCategory === key && (
                    <div
                      className={`absolute top-full mt-0 w-64 bg-main-dark border border-gray-500 rounded-md shadow-lg py-1 ${isLast ? 'right-0' : 'left-0'
                        }`}
                    >
                      {value.subcategories.map((sub, index) => (
                        <a
                          key={index}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-main-dark transition-colors rounded-md mx-1 my-0.5"
                          onClick={() => setHoveredCategory(null)}
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Categories Dropdown */}
          {mobileOpen && (
            <div
              className="absolute top-14 left-0 w-full bg-white shadow-md z-40 sm:hidden 
                        max-h-[calc(100vh-3.5rem)] overflow-y-auto"
            >
              {Object.entries(categories).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200">
                  <div className="px-4 py-1 font-semibold text-gray-800 bg-white sticky top-0 z-10">
                    {value.label}
                  </div>
                  <div className="pl-6 pb-1">
                    {value.subcategories.map((sub, index) => (
                      <a
                        key={index}
                        href={sub.href}
                        className="block py-1 text-sm text-gray-800 hover:underline"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>

  );
};

export default NavigationBar;
