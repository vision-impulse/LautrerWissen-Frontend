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

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageInfo {
  url: string;
  author_name: string;
  license_url: string;
  license_text: string;
}

interface ImageCarouselProps {
  images: ImageInfo[];
  fallbackImage: {
    url: string;
    author_name: string;
    license_url: string;
    license_text: string;
  };
}

export default function ImageCarousel({ images, fallbackImage }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    // Show the fallback image if no images are available
    return (
      <div className="text-sm text-gray-800 space-y-2 mb-5 px-5">
        <div className="relative my-4">
          <img className="w-full h-auto" src={fallbackImage.url} alt="Object Image" />
          <div className="absolute left-0 right-0 bottom-0 p-1 bg-black bg-opacity-25 backdrop-blur-md">
            <div className="text-[6px] md:text-[8px] font-medium text-gray-300">
              <a href={fallbackImage.license_url}>{fallbackImage.license_text}</a> ({fallbackImage.author_name})
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-sm text-gray-800 space-y-2 mb-5 px-5">
      <div className="relative my-4 overflow-hidden w-full">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="min-w-full max-h-[700px] flex items-center justify-between bg-black bg-opacity-25 backdrop-blur-md">
              <img src={image.url} className="min-w-full p-0 max-w-full min-h-full object-center object-fit" alt={`Slide ${index}`} />
              <div className="absolute bottom-0 min-w-full p-1 bg-black bg-opacity-25 backdrop-blur-md">
                <div className="text-[6px] md:text-[8px] font-medium text-gray-300">
                  <a href={image.license_url}>{image.license_text}</a> ({image.author_name})
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-3 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-black bg-opacity-60 text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
