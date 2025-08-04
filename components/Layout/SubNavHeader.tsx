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
import { useRouter } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import React from 'react';

export interface Breadcrumb {
  label: string;
  href: string;
}

interface SubheaderProps {
  breadcrumbs: Breadcrumb[];
}

const SubNavHeader: React.FC<SubheaderProps> = ({ breadcrumbs }) => {
  const router = useRouter();
  const lastIndex = breadcrumbs.length - 1;
  return (

    <nav className="top-14 sticky z-30 bg-main-dark border-b border-gray-300 space-x-4 py-2 sm:px-6 pl-4 md:pl-8">
      <div className="max-w-screen-xl mx-auto px-1 sm:px-6 lg:px-1">

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center text-sm text-gray-100 space-x-1">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center space-x-1">
              {index > 0 && <ChevronRight className="w-4 h-4 text-gray-100" />}
              {index === lastIndex ? (
                <span className="font-medium text-gray-100">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="hover:underline text-gray-100">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

      </div>
    </nav>

  );
};

export default SubNavHeader;
