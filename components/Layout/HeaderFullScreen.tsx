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

import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react';

import KLStadt from '@/assets/logos/KLstadt.png'

interface HeaderProps {
    children?: ReactNode;
  }
  
const HeaderFullScreen: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className="top-0 before:absolute before:inset-0 before:backdrop-blur-md before:bg-white/90 dark:before:bg-gray-800/90 lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90 before:-z-10 max-lg:shadow-sm z-30">
       
        <div className="flex h-16 md:h-18 border-gray-200 dark:border-gray-700/60 bg-main-dark">
      
            <div className="flex items-center h-full justify-between lg:px-1 w-full mx-auto ml-4">
                <div className="flex items-center justify-center h-full">

                    <Link href="https://www.kaiserslautern.de/" target="_blank">
                    <Image
                        alt="KL Digital Logo"
                        className="object-contain"
                        style={{ height: "95", width: '80px', maxHeight: '80px' }}
                        src={KLStadt}
                    />
                    </Link>
                </div>
      
                <div className="flex items-center justify-center h-full">
                    <a href="/">
                    <span className="self-center text-2xl md:text-4xl text-gray-100 font-semibold whitespace-nowrap dark:text-white">Lautrer Wissen</span>
                    </a>
                </div>
      
                <div className="flex items-center justify-end space-x-3 px-2">
                </div>

            </div>
        </div>
        </header>
    );
};

export default HeaderFullScreen;
