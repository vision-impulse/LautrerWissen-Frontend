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

'use client'

import Section from '@/components/Tiles/Box';

import { useState } from "react";
import config from '@/config';
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";


export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="grow max-w-screen-xl mx-auto py-8">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

        <Section title="Weitere Dienste und Links" footer_date_title="" footer_source_title="">

          <div className="text-justify p-8">

            <div className="space-y-4">
          
              <div>
              <b>3D-Modell (Land RLP)</b>: Das 3D-Modell ist eine digitale Darstellung der Stadt Kaiserslautern, welche es ermöglicht, die geografischen und landschaftlichen Merkmale in drei Dimensionen zu erkunden. Das Modell zeigt die Höhen und Tiefen, was eine detaillierte Ansicht der unterschiedlichen Geländeformen bietet wie beispielsweise der Hügel des Pfälzerwaldes. 
              <a
                  href="https://rheinland-pfalz-in-3d.rlp.de/?35Oqiq64CKwk85tUEx94Ckp0B4pe7K63a6Zj000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-dark-blue underline hover:text-main-link-hover flex items-center space-x-1"
                >
                  <span>{"Zum 3D-Modell (Land RLP)"}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div>
              <b>KLmitWirkung</b>: KLmitWirkung, die offizielle Beteiligungsplattform der Stadt Kaiserslautern, bietet eine Übersicht über alle Beteiligungsformate der Stadtverwaltung, bei welchen man aktiv mitwirken kann. Die Beteiligungen können variieren: Mal sind es Umfragen, mal kann an Texten mitgeschrieben oder eigene Anregungen mitgeteilt werden. Die Beteiligungen sind anonym, zur Nutzung der Plattform ist lediglich eine einmalige Registrierung notwendig.
              <a
                  href="https://klmitwirkung.de/de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-dark-blue underline hover:text-main-link-hover flex items-center space-x-1"
                >
                  <span>{"Zu KLmitWirkung"}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div>
              <b>KL Navi</b>: Bei KLNavi handelt es sich um eine individualisierbare Routenplanung über eine Web-Anwendung, die eine breite Palette an Verkehrsmitteln miteinbezieht sowie auf die ganz persönlichen Bedürfnisse und Präferenzen der Nutzenden eingeht.
              <a
                  href="https://klnavi.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-dark-blue underline hover:text-main-link-hover flex items-center space-x-1"
                >
                  <span>{"Zu KL Navi"}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div>
              <b>Solarkataster Photovoltaik (Stadt Kaiserslautern)</b>: Das Solarkataster ermöglicht die Bestimmung des Photovoltaikpotenzials von Gebäuden. Für die Stadt Kaiserslautern basiert das Solarkataster auf einem semantischen 3D-Stadtmodell (Digitaler Zwilling), welches die solaren Potenziale aller Dach- und Wandflächen erfasst. Diese Daten fließen in die Berechnung der Photovoltaiktauglichkeit von Gebäuden ein. Das Modell ermöglicht es zudem, den Sonnenstand und die Verschattung je nach Datum und Uhrzeit zu simulieren. 
              <a
                  href="https://geoportal.kaiserslautern.de/solar/#/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-dark-blue underline hover:text-main-link-hover flex items-center space-x-1"
                >
                  <span>{"Zum Solarkataster Photovoltaik (Stadt Kaiserslautern)"}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div>
              <b>Solarkataster Photovoltaik (Land RLP)</b>: Mit Hilfe des Solarkatasters Photovoltaik des Landes RLP ist es möglich, die Photovoltaikpotenziale auf Dachflächen zu prüfen. In einem weiteren Schritt ist es möglich, die Wirtschaftlichkeit einer Photovoltaikanlage auf entsprechender Dachfläche zu berechnen.
                <a
                  href="https://www.energieatlas.rlp.de/earp/daten/solarkataster/solarkataster-photovoltaik/suche/0731200000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-dark-blue underline hover:text-main-link-hover flex items-center space-x-1"
                >
                  <span>{"Zum Solarkataster Photovoltaik (Land RLP)"}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>

              <div>
              <b>Solarkataster Solarthermie (Land RLP)</b>: Mit Hilfe des Solarkatasters Solarthermie des Landes RLP ist es möglich, die Solarthermiepotenziale auf Dachflächen zu prüfen. In einem weiteren Schritt ist es möglich, die Wirtschaftlichkeit einer Solarthermieanlage auf entsprechender Dachfläche zu berechnen.
              <a
                  href="https://www.energieatlas.rlp.de/earp/daten/solarkataster/solarkataster-solarthermie/suche/0731200000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-dark-blue underline hover:text-main-link-hover flex items-center space-x-1"
                >
                  <span>{"Zum Solarkataster Solarthermie (Land RLP)"}</span>
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            
            </div>

          </div>
        </Section>
      </div>
    </main>

  );
}
