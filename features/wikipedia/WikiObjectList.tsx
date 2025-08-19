"use client";
import { useEffect, useState } from "react";
import { WikiObjectsModelAPIResponse } from "@/types/api";
import LoadingFallback from "@/components/Layout/LoadingFallback";


interface WikiObjectListProps {
  objects: WikiObjectsModelAPIResponse[];
  isLoading: boolean;
  error: Error | null;
  titleListBox: string;
}

export default function WikiObjectList({ objects, isLoading, error, titleListBox }: WikiObjectListProps) {
  const detailPagePath: string = "./";

  if (isLoading) {
    return (
      <div className='grow'>
        <LoadingFallback />
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-white shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-main-heading">{titleListBox}</h2>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border-t border-gray-100 w-full">
          <thead className="text-xs font-semibold uppercase text-gray-500 bg-gray-50 border-t border-b border-gray-100">
            <tr className="text-left">
              <th className="p-2 py-3 text-sm border-b border-gray-100 text-center">Vorschau</th>
              <th className="p-2 py-3 text-sm border-b border-gray-100 text-center">Name</th>
              <th className="p-2 py-3 text-sm hidden md:table-cell border-b border-gray-100 text-center">Ortsbezirk</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((obj) => (
              <tr key={obj.id}>
                <td className="border-b border-gray-100 p-0 max-w-xs flex justify-center">
                  {obj.image_url && obj.image_url.trim() !== "" && (
                    <div className="relative max-w-64">
                      <img src={obj.image_url} alt={obj.name} className="w-full h-auto object-cover" />
                      <div className="absolute left-0 right-0 bottom-0 p-0.5 bg-black bg-opacity-25 backdrop-blur-md">
                        <div className="text-[6px] md:text-[8px] font-medium text-gray-300">
                          <a href={obj.image_license_url}>{obj.image_license_text}</a> ({obj.image_author_name})
                        </div>
                      </div>
                    </div>
                  )}
                </td>
                <td className="p-2 break-words border-b border-gray-100 text-center">
                  <a
                    className="text-center text-sm md:text-base font-semibold text-main-link hover:text-main-link-hover"
                    href={`${detailPagePath}/${obj.id}`}
                  >
                    {obj.name}
                  </a>
                </td>
                <td className="p-2 hidden md:table-cell border-b border-gray-100">
                  <div className="text-center">{obj.city_district_name}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
