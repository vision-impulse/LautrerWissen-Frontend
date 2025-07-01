'use client';

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import ObjectMap from "./ObjectMap";
import ImageCarousel from "./ImageCarousal";
import ObjectList from "./WikiObjectList";
import { WikiObjectDetailPageAPIRepsonse } from "@/types/api";

interface WikiObjectDetailBoxesProps {
  data: WikiObjectDetailPageAPIRepsonse;
  isLoading: boolean;
  error: Error | null;
  titleInfoBox: string;
  titleImageBox: string;
  titleLocationBox: string;
  titleNearbyObjectBox: string;
}

const WikiObjectDetailBoxes: React.FC<WikiObjectDetailBoxesProps> = ({ 
  data, isLoading, error, titleInfoBox, titleImageBox, 
  titleLocationBox, titleNearbyObjectBox }) => {

  if (isLoading) return <p></p>;
  return (
    <div>
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="flex flex-col space-y-4">
        {/* Information Section */}
        <div className="bg-white  shadow-sm rounded-xl p-2">
          <header className="px-5 py-2 border-b border-gray-100 ">
            <h2 className="font-bold text-main-heading text-lg ">
              {titleInfoBox} 
            </h2>
          </header>
          <div className="px-5 pt-3 text-gray-800 space-y-1 mb-5 text-sm md:text-base">
            {Object.entries(data.fields_to_display).map(([key, value]) => (
              <div key={key} className="py-0 pt-0 my-1">
                <span className="font-semibold">{key}: </span> {value}
              </div>
            ))}
            {data.references.length > 0 && (
              <div className="py-0 pt-0 my-1">
                <span className="font-semibold">Referenzen:</span>
                <ol className="list-decimal pl-5 text-sm font-medium text-main-link">
                  {data.references.map((ref, index) => (
                    <li key={index}>
                      <a href={ref.link} className="text-main-link hover:text-main-link-hover ">
                        {ref.ref}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            <div className="py-0 pt-0 my-1">
              <span className="font-semibold">Datenquelle: </span>
              <a href={data.wikipedia_link} className="text-main-link hover:text-main-link-hover">
                Wikipedia
              </a>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="bg-white shadow-sm rounded-xl p-2">
          <header className="px-5 py-2 border-b border-gray-100 ">
            <h2 className="font-bold text-main-heading text-lg ">
              {titleLocationBox}
            </h2>
          </header>
          <div className="px-5 py-5">
            <ObjectMap coordinates={[data.coordinate.latitude, data.coordinate.longitude]} />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4">
        {/* Image Section */}
        {data.image_info.image_url.trim() !== "" && (
          <div className="bg-white  shadow-sm rounded-xl p-2">
            <header className="px-5 py-2 border-b border-gray-100 ">
              <h2 className="font-bold text-main-heading text-lg ">
              {titleImageBox}
              </h2>
            </header>

            <ImageCarousel
              images={data.image_info.image_additional_info || []}
              fallbackImage={{
                url: data.image_info.image_url,
                author_name: data.image_info.image_author_name,
                license_url: data.image_info.image_license_url,
                license_text: data.image_info.image_license_text,
              }}
            />  
          </div>
        )}

        {/* Nearby Objects Section */}
        <div className="bg-white  shadow-sm rounded-xl p-2">
          <header className="px-5 py-2 border-b border-gray-100 ">
            <h2 className="font-bold text-main-heading text-lg ">
              {titleNearbyObjectBox}
            </h2>
          </header>
          <div className="px-5 py-1">
            <ul>
              {data.nearby_objects.map((obj) => (
                <li key={obj.id} className="flex px-0 border-b border-gray-100  my-1">
                  <div className="grow flex justify-between text-sm md:text-base">
                    <span>{obj.name} ({obj.distance} km)</span>
                    <a href={`./${obj.id}`} className="text-main-link hover:text-main-link-hover">
                      Ansehen
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <br></br>
    </div>
  );
};

export default WikiObjectDetailBoxes;
