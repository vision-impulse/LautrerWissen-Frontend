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

import { Menu, X } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Image from 'next/image'

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
    <nav
      className="top-0 sticky z-40 h-14 bg-main-dark backdrop-blur-md border-b border-white/10 shadow-md"
      aria-label="Main navigation"
    >
      <div className="max-w-screen-xl mx-auto px-1 sm:px-6 lg:px-1">
        <div className="flex justify-between h-14 items-center relative">

          {/* Mobile Menu Button + Title */}
          <div className="flex items-center md:hidden w-full justify-between px-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <a href="/" className="text-xl text-white text-center flex-grow">
              Lautrer Wissen
            </a>

            {/* Spacer */}
            <div style={{ width: "24px" }} />
          </div>

          {/* Desktop Branding */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center justify-center h-full pl-2">
              <a href="/" aria-label="Home">
                <Image
                  alt="Logo Kaiserslautern"
                  className="object-contain"
                  width={60}
                  height={60}
                  src="/logos/Kaiserslautern.png"
                />
              </a>
            </div>
            <a href="/" className="text-xl text-white whitespace-nowrap">
              Lautrer Wissen
            </a>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6 relative z-50" role="menubar">
            {Object.entries(categories).map(([key, value], index, arr) => {
              const isLast = index === arr.length - 1;

              return (
                <li
                  key={key}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                  role="none"
                >
                  {/* MAIN MENU BUTTON */}
                  <button
                    className="text-white font-playfair-display text-md hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-colors py-1 px-3 rounded-md"
                    aria-haspopup="menu"
                    aria-expanded={hoveredCategory === key}
                    onFocus={() => handleMouseEnter(key)}
                    onBlur={(e) => {
                      // Close if focus moves outside item
                      if (!e.currentTarget.closest("nav")?.contains(e.relatedTarget)) {
                        handleMouseLeave();
                      }
                    }}
                  >
                    {value.label}
                  </button>

                  {/* SUBMENU */}
                  {hoveredCategory === key && (
                    <ul
                      id={`submenu-${key}`}
                      role="menu"
                      hidden={hoveredCategory !== key}
                      className={`absolute top-full mt-0 w-64 bg-main-dark border border-gray-500 rounded-md shadow-lg py-1 ${isLast ? "right-0" : "left-0"
                        }`}
                    >
                      {value.subcategories.map((sub, index) => (
                        <li key={index} role="none">
                          <a
                            href={sub.href}
                            role="menuitem"
                            className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-main-dark transition-colors rounded-md mx-1 my-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            onClick={() => setHoveredCategory(null)}
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div
              id="mobile-menu"
              className="absolute top-14 left-0 w-full bg-white shadow-md z-40 sm:hidden 
                max-h-[calc(100vh-3.5rem)] overflow-y-auto"
              role="dialog"
              aria-modal="true"
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
                        className="block py-1 text-sm text-gray-800 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
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
