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
import { ChevronDown } from "lucide-react";
import config from '@/config';

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="grow max-w-screen-xl mx-auto py-8">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

        <Section title="Impressum (Angaben gemäß § 5 TMG)" footer_date_title="" footer_source_title="">

          <div className="text-justify p-8">

            <div className="whitespace-pre-line text-base">
              <b>Stadt Kaiserslautern</b> {"\n"}
              Stadtverwaltung Rathaus {"\n"}
              
              Willy-Brandt-Platz 1 {"\n"}
              67657 Kaiserslautern {"\n"}
              Postfach 1320 {"\n"}
              67603 Kaiserslautern {"\n\n"}
              
              Telefon: +49 631 365-0 {"\n"}
              Telefax: +49 631 365-2553 {"\n"}
              E-Mail: stadt@kaiserslautern.de {"\n"}
              Internet: www.kaiserslautern.de {"\n\n"}
              
              Die Stadt Kaiserslautern ist eine Körperschaft des öffentlichen Rechts. {"\n"}
              Sie wird vertreten durch die Oberbürgermeisterin Beate Kimmel. {"\n"}
              Die Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz lautet:DE 148641057. {"\n\n"}
              
              <hr />{"\n"}
              
              <b>Aufsichtsbehörde</b> {"\n"}
              Aufsichts- und Dienstleistungsdirektion {"\n\n"}
              
              Kurfürstliches Palais {"\n"}
              Willy-Brandt-Platz 3 {"\n"}
              D-54290 Trier {"\n\n"}
              
              Postfach 13 20 {"\n"}
              D-54203 Trier {"\n\n"}
              
              Tel.: +49 (651) 9494-0 {"\n"}
              Fax.: +49 (651) 9494-170 {"\n"}
              E-Mail: poststelle@add.rlp.de {"\n"}
              Internet: www.add.rlp.de {"\n\n"}

              <hr />{"\n"}

              <b>Verantwortlich nach Telemediengesetz (TMG): </b>{"\n"}
              Oberbürgermeisterin {"\n"}
              Beate Kimmel {"\n"}
              Willy-Brandt-Platz 1 {"\n"}
              67657 Kaiserslautern {"\n\n"}

              Telefon: +49 631 365-0 {"\n"}
              Telefax: +49 631 365-2553 {"\n"}
              E-Mail: stadt@kaiserslautern.de {"\n"}{"\n"}

              <hr />{"\n"}

              <b>Konzeption, Realisierung, Programmierung und Design</b>{"\n"}
              Referat Digitalisierung und Innovation {"\n"}
              Willy-Brandt-Platz 1 {"\n"}
              67657 Kaiserslautern {"\n"}
              Tel.: 0631 365 - 0 {"\n"}{"\n"}

              Vision Impulse GmbH {"\n"}
              Zollamtstraße 11 {"\n"}
              67663 Kaiserslautern {"\n"}{"\n"}

              <hr />{"\n"}

              <b>Rechtlicher Hinweis:</b>{"\n"}
              Die Stadt Kaiserslautern ist bemüht, für Richtigkeit und Aktualität aller in diesen Web-Seiten enthaltenen Informationen und Daten zu sorgen.
              Eine Haftung oder Garantie für Aktualität, Richtigkeit und Vollständigkeit der -uns zur Verfügung gestellten- Informationen ist jedoch ausgeschlossen.
              Dies gilt insbesondere auch für alle anderen Webseiten, die mit einem Hyperlink angewählt werden. Die Stadt Kaiserslautern ist für den Inhalt solcher Seiten, die mittels eines o.g. Links zustande kommen, ebenfalls nicht verantwortlich.
              Die Stadt Kaiserslautern behält sich vor, Änderungen oder Ergänzungen der bereitgestellten Informationen -ohne Ankündigung- vorzunehmen.
              Inhaltlich sind die Seiten der Stadt Kaiserslautern urheberrechtlich geschützt. Vervielfältigung von Informationen und/oder Daten, insbesondere die Verwendung von Texten, Textteilen oder jegliches Bildmaterial (auch in modifizierter Form) bedarf der vorherigen schriftlichen Zustimmung der Stadt Kaiserslautern.
              Ausschließlich deutschem Recht unterliegen jegliche Informationen und/oder Daten, deren Nutzung, sowie sämtliches mit den Webseiten der Stadt Kaiserslautern zusammenhängendes Tun, Dulden oder Unterlassen.
              Erfüllungsort und ausschließlicher Gerichtsstand ist Kaiserslautern. {"\n"}{"\n"}
              
              <hr />{"\n"}

              <b>Rechtswirksamkeit elektronischer Kommunikation</b>{"\n"}
              Gemäß § 3a Verwaltungsverfahrensgesetz (VwVfG) ist die Übermittlung elektronischer Dokumente zulässig, soweit der Empfänger hierfür einen Zugang eröffnet. Die Stadtverwaltung Kaiserslautern hat diesen Zugang eröffnet und betreibt die virtuelle Poststelle entsprechend den Grundsätzen der elektronischen Kommunikation.{"\n"}
              Die E-Mail-Adresse des Impressums oder sonstige E-Mail-Adressen in diesem Internetauftritt, insbesondere im Bürgerservice, sind nicht als Zugang zur Übermittlung elektronischer Dokumente geöffnet, sofern dieses nicht im Einzelfall anders und besonders gekennzeichnet ist.{"\n"}{"\n"}

              Elektronische Kommunikation: stv-kaiserslautern@poststelle.rlp.de {"\n"}{"\n"}

              <hr />{"\n"}

              <b>Copyright</b>{"\n"}
              Bildnachweise:{"\n"}
              Foto „Sehenswertes: © ZRW Mediathek/Harald Kröher (Bild Nr. 15363770){"\n"}
              Foto „Aktuelle Termine“: © Eakrin/stock.adobe.com (AdobeStock_373074940){"\n"}
              Foto „Statistik“: © Wasan/stock.adobe.com (AdobeStock_571950706){"\n"}

            </div>
          </div>

        </Section>
      </div>
    </main>

  );
}
