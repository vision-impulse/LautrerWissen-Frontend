// components/Footer.tsx

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

import BMWSBLogo from '@/assets/logos/BMWSB.png'
import KFWLogo from '@/assets/logos/KfW.png'
import KLLogo from '@/assets/logos/Kaiserslautern.png'
import KLDigitalLogo from '@/assets/logos/HerzlichDigital.png'

const Footer = () => {
  return (
    <footer className="bg-main-dark" >
      <div className="px-4 sm:px-6 lg:px-6 py-0 md:py-0 lg:py-2 w-full max-w-9xl mx-auto">
        <div className="mx-auto w-full max-w-screen-xl py-4 md:py-6 lg:py-8">

          <div className="md:flex md:justify-between text-white dark:text-white">
            <div className="hidden md:block mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <span className="self-center text-2xl  font-semibold whitespace-nowrap pl-2 pr-8">Lautrer Wissen</span>
              </a>
              <div className='text-sm pl-2 pt-1'>Das Wissensportal der Stadt Kaiserslautern</div>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div className="grid px-2 pt-4 md:pt-0 justify-center">
                <h2 className="mb-2 md:mb-3 text-sm font-semibold uppercase" >Ressourcen</h2>
                <ul className="font-medium">
                  <li className="mb-8 md:mb-10">
                    <a href="/about/" className="text-sm font-medium hover:underline">FAQs</a>
                  </li>
                </ul>
              </div>
              <div className="grid px-2 pt-4 md:pt-0 justify-center">
                <h2 className="mb-2 md:mb-3 text-sm font-bold uppercase">Folge uns</h2>
                <ul className="font-medium">
                  <li className="mb-1 md:mb-2">
                    <a href="https://www.instagram.com/stadtkl/" target="_blank" className="text-sm hover:underline ">Kaiserslautern</a>
                  </li>
                  <li className="mb-1 md:mb-2">
                    <a href="https://www.instagram.com/herzlichdigital/" target="_blank" className="text-sm hover:underline">Herzlich Digital</a>
                  </li>
                  <li></li>
                </ul>
              </div>
              <div className="grid px-2 pt-4 md:pt-0 justify-center">
                <h2 className="mb-2 md:mb-3 text-sm font-bold uppercase">Rechtliches</h2>
                <ul className="font-medium">
                  <li className="mb-1 md:mb-2">
                    <a href="/impressum" className="text-sm hover:underline">Impressum</a>
                  </li>
                  <li className="mb-1 md:mb-2">
                    <a href="/data_privacy" target="_blank" className="text-sm hover:underline">Datenschutz</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />

          <div className="flex flex-wrap justify-center items-center gap-4 px-4">
            <Link href="https://www.bmwsb.bund.de/" target="_blank">
              <Image
                alt="BMWSB Logo"
                className="object-contain p-1"
                style={{ maxHeight: '140px', maxWidth: '160px' }}
                src={BMWSBLogo}
              />
            </Link>

            <Link href="https://www.kfw.de/" target="_blank">
              <Image
                alt="KFW Logo"
                className="object-contain"
                style={{ maxHeight: '140px', height: '90px', maxWidth: '170px' }}
                src={KFWLogo}
              />
            </Link>

            <Link href="https://www.kaiserslautern.de/" target="_blank">
              <Image
                alt="Kaiserslautern Logo"
                className="object-contain"
                style={{ maxHeight: '140px', height: '90px', maxWidth: '170px' }}
                src={KLLogo}
              />
            </Link>

            <Link href="https://www.herzlich-digital.de/" target="_blank">
              <Image
                alt="Herzlich Digital Logo"
                className="object-contain p-2"
                style={{ maxHeight: '140px', maxWidth: '170px' }}
                src={KLDigitalLogo}
              />
            </Link>
          </div>

          <div className="flex justify-center text-sm pl-2 pt-1 text-white">Eine Lösung der&nbsp;<a href='https://vision-impulse.com' target="_blank" className="hover:underline ">Vision Impulse GmbH</a></div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
