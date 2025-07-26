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


const AboutPage = () => {
  return (
    <main className="h-screen grow max-w-screen-xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">
        <div>
          <br></br>
          <Section title="Über das Lautrer Wissen" footer_date_title="" footer_source_title="">
            <div className="text-justify p-2">
              <p className='leading-loose'>
                Was passiert mit der Baustelle in meinem Viertel? Wie sind hier die Feinstaubwerte? Und gab es bei der letzten Sitzung des Stadtrats vielleicht Entscheidungen, die mich betreffen?
                Die Lautrerinnen und Lautrer sind an ihrer Stadt und insbesondere an ihrem direkten Umfeld interessiert. Mit diesem Projekt wollen wir den Bürgerinnen und Bürgern den Zugriff, auf für sie wichtige Informationen noch einfacher machen! Über QR-Codes im öffentlichen Raum und natürlich über Weblinks sollen Interessierte auf eine Website (ein sogenanntes Dashboard) gelangen, die wichtige Infos für das jeweilige Quartier zusammenfasst. Das können z. B. Echtzeitdaten von Messungen zur Luftqualität sein oder aber auch besagte Beschlüsse von Stadtratssitzungen. Denkbar sind Fotos, verständliche Karten, Infotexte und die grafische Darstellung von Daten. So sollen die Bürgerinnen und Bürger einfacher, konkreter und verständlich aufbereitet an Infos gelangen, die für ihren Alltag in der Stadt wichtig sind. Das Verständnis und Interesse für die Bedeutung von verschiedenen Daten der Stadt soll so gestärkt werden.
              </p>
            </div>
          </Section>
          <br></br>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;