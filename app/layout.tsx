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

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../assets/globals.css"

import Footer from '@/components/Layout/Footer';
import NavigationBarDefault from '@/components/Layout/NavigationBarDefault';
import publicConfig from "@/config/public";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lautrer Wissen",
  description: "Vision Impulse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain={publicConfig.plausible.domain}
          src={publicConfig.plausible.src}
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-[100dvh] overflow-hidden font-inter antialiased bg-gray-100 text-gray-600">
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <NavigationBarDefault />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
