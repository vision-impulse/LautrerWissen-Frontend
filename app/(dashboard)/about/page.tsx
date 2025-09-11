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

const faqs = [
  { question: "Was ist das Lautrer Wissen?", answer: "Lautrer Wissen ist eine umfassende Plattform für Daten und Informationen über Kaiserslautern. Ob Baustellen, Veranstaltungen, öffentliche Toiletten oder WLAN-Hotspots – alle relevanten städtischen Themen finden Sie hier gebündelt. Viele der Inhalte werden direkt auf einer interaktiven Themenkarte angezeigt, für zusätzliche Informationen gibt es Verlinkungen zu externen Seiten." },
  { question: "Wie funktioniert die Themenkarte?", answer: "Die Themenkarte ist einfach zu bedienen: Wählen Sie die Themen aus, die Sie interessieren – schon erscheinen die passenden Informationen auf der Karte. Je nach Inhalt sehen Sie durch Anklicken der Punkte und Flächen in der Karte weitere Details zur Datenquelle oder gelangen per Link zu weiterführenden Angeboten." },
  { question: "Was macht das Lautrer Wissen besonders?", answer: "Das Lautrer Wissen ist technisch innovativ. Die meisten Daten werden automatisch eingebunden – Änderungen in den jeweiligen Quellen erscheinen dadurch sofort auf der Plattform. So ist die Seite immer aktuell, ganz ohne manuelle Pflege.<br>Ein weiterer Vorteil: Für einige Themen wurden erstmals systematisch Daten erhoben und öffentlich gemacht. Diese stehen offen zur Verfügung und können auch für eigene Projekte genutzt werden. Noch ein Pluspunkt: Der Quellcode ist öffentlich einsehbar – andere Städte können also auch davon profitieren." },
  { question: "Wer steckt dahinter?", answer: "Das Projekt wurde von der Stadt Kaiserslautern, genauer gesagt vom Referat Digitalisierung und Innovation und der städtischen Tochter KL.digital GmbH, entwickelt. Es ist Teil der herzlich digitalen Stadt Kaiserslautern und wird im Rahmen des Förderprogramms „Modellprojekte Smart Cities“ vom Bundesministerium für Wohnen, Stadtentwicklung und Bauwesen sowie der KfW unterstützt." },
  { question: "Woher stammen die Daten und kann ich selbst etwas beitragen?", answer: `Die Daten kommen aus verschiedenen Quellen: von städtischen Referaten, externen Partnern oder offenen Plattformen wie OpenStreetMap. Das Lautrer Wissen versteht sich als offenes Portal. Jeder kann Daten beisteuern. Voraussetzung ist, dass sie einen Mehrwert für Kaiserslautern bieten und als Open Data verfügbar gemacht werden. Haben Sie eigene Daten, die für die Plattform interessant sein könnten? Dann melden Sie sich gerne via E-Mail an <a href='mailto:${config.emailAddressContact}'>${config.emailAddressContact}</a>.`},
  { question: "Kann ich meine eigenen Veranstaltungen im Lautrer Wissen eintragen?", answer: `Möchten Sie einen Termin in unserem Veranstaltungskalender eintragen? Es ist ganz einfach! Registrieren Sie sich auf der Plattform wasgehtapp unter <a href="https://www.wasgehtapp.de" class="underline">https://www.wasgehtapp.de</a> und fügen Sie Ihre Veranstaltung direkt in den Kalender ein. Egal ob es sich um einen privaten Hausflohmarkt, ein spannendes Fußballspiel Ihres Sportvereins oder das nächste große Fest in Ihrer Gemeinde handelt, mit wasgehtapp können Termine schnell und unkompliziert geteilt werden.`},
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="grow max-w-screen-xl mx-auto py-8">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

        <Section title="Herzlich Willkommen beim Lautrer Wissen" footer_date_title="" footer_source_title="">

          <div className="text-justify p-8">
            <p className='leading-snug'>
              Lautrer Wissen ist eine zentrale Plattform für Informationen rund um die Stadt Kaiserslautern. Hier finden Sie alles Wichtige übersichtlich und aktuell an einem Ort. Wenn Sie Fragen haben, schreiben Sie uns gerne an <a href={`mailto:${config.emailAddressContact}`}>{config.emailAddressContact}</a>.

              Wir wünschen Ihnen viel Spaß mit dem Lautrer Wissen! Schauen Sie sich um und erleben Sie, was die Stadt Kaiserslautern Interessantes zu bieten hat.
            </p>
          </div>

          <section className="max-w-5xl mx-auto p-6 text-main-dark">

            <h2 className="text-2xl font-bold mb-6 text-center ">Häufig gestellte Fragen</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border rounded-2xl p-4 shadow-sm"
                >
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="font-bold">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${openIndex === i ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {openIndex === i && (
                    <p
                      className="mt-3"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    ></p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Section>
      </div>
    </main>

  );
}
