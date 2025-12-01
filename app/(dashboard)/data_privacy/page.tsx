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

export default function DataPrivacyPage() {
  return (
    <main className="grow max-w-screen-xl mx-auto py-8">
      <div className="px-4 sm:px-6 lg:px-8 w-full max-w-9xl mx-auto">

        <Section title="Datenschutzerklärung" footer_date_title="" footer_source_title="">
          <div className="text-justify p-8">

            <h2 className="font-bold text-lg">1. Verantwortliche Stelle</h2><br />
            <p><b>KL.digital GmbH</b><br /><br />
              Bahnhofstraße 26-28<br />
              67655 Kaiserslautern<br />
              Telefon: +49 631 205894-70<br />
              Telefax: +49 631 205894-99<br />
              E-Mail: info@kl.digital‌‌‌‌<br />
              Internet: <a href="https://www.herzlich-digital.de">https://www.herzlich-digital.de‌‌</a></p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">2. Allgemeine Hinweise zur Datenverarbeitung</h2><br />
            <p className="text-base">Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Website erforderlich ist oder Sie darin eingewilligt haben. Auf dieser Website werden keine personenbezogenen Daten von Besuchern aktiv gesammelt, außer in den nachfolgend beschriebenen Fällen.</p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">3. Server-Logfiles / Access-Log</h2><br />
            <p className="text-base">Zum Betrieb, zur Fehlerbehandlung und zum Monitoring der Website werden automatisch Daten in den Server-Access-Logs gespeichert. Dies umfasst insbesondere:</p>
            <ol className='list-disc px-6'>
              <li>die IP-Adresse</li>
              <li>den Browser/User-Agent und das Betriebssystem</li>
              <li>Datum, Uhrzeit und angefragte URL</li>
              <li>Statuscode und übertragene Datenmenge</li>
            </ol>
            <p>
              Diese Daten dienen ausschließlich der Sicherheit, Stabilität und Fehlerdiagnose. Die Logs werden auf technisch notwendige Dauer begrenzt und sind nur für Administratoren zugänglich.
              <br /><br />Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an Betrieb, Sicherheit und Monitoring der Website).
            </p>
            <hr className="border-gray-300 my-3" />


            <h2 className="font-bold text-lg">4. Analyse & Monitoring der Seitenaufrufe</h2><br />
            <p className="text-base">Zur Analyse anonymer Seitenzugriffe nutzen wir Plausible Analytics. Plausible arbeitet vollständig ohne Cookies und ohne personenbezogene Daten. Alle erfassten Informationen (z.B. Seitenaufrufe, Referrer, Gerätetyp) sind anonymisiert und lassen keine Identifizierung einzelner Besucher zu.
              <br /><br />Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
            </p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">5. Cookies</h2><br />
            <p className="text-base">Auf dieser Website werden keine Tracking- oder Marketing-Cookies eingesetzt. Lediglich für Admin-/Backend-Zugänge kommen technisch notwendige Cookies zum Einsatz (z.B. Session-Cookies zur Anmeldung).
              Diese Cookies:</p>
            <ol className='list-disc px-6'>
              <li>enthalten keine personenbezogenen Daten</li>
              <li>dienen ausschließlich der Funktionalität</li>
              <li>werden nach Ende der Sitzung gelöscht.</li>
            </ol>
            <p>
              <br />Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.<br />
            </p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">6. Kontaktaufnahme</h2><br />
            <p className="text-base">Wenn Sie uns per E-Mail kontaktieren, werden die übermittelten Daten ausschließlich zur Bearbeitung der Anfrage verwendet.
              <br />Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Anfragebearbeitung).
            </p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">7. Ihre Rechte</h2><br />
            <p className="text-base">Sie haben gemäß DSGVO folgende Rechte:</p>
            <ol className='list-disc px-6'>
              <li>Auskunft über die gespeicherten Daten (Art. 15)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16)</li>
              <li>Löschung Ihrer Daten („Recht auf Vergessenwerden“, Art. 17)</li>

              <li>Einschränkung der Verarbeitung (Art. 18)</li>
              <li>Widerspruch gegen Verarbeitung (Art. 21)</li>
              <li>Datenübertragbarkeit (Art. 20)</li>
              <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77)</li>
            </ol>
            <p>
              <br />
              Die zuständige Aufsichtsbehörde ist: Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz, Hintere Bleiche 34, 55116 Mainz, Telefon: 06131 / 208-2449, E-Mail: poststelle@datenschutz.rlp.de, Internet: www.datenschutz.rlp.de
            </p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">8. Hosting</h2><br />
            <p className="text-base">Die Website wird bei Hetzner auf Server in Deutschland betrieben. Es werden keine personenbezogenen Daten durch den Hoster gespeichert, außer technisch zwingend notwendigen anonymisierten Daten zur Bereitstellung des Angebots.</p>
            <hr className="border-gray-300 my-3" />

            <h2 className="font-bold text-lg">9. Änderungen dieser Datenschutzerklärung</h2><br />
            <p className="text-base">Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder Änderungen unserer Leistungen berücksichtigt.</p>
            <hr className="border-gray-300 my-3" />
            <div className="whitespace-pre-line text-base">

            </div>
          </div>
        </Section>
      </div>
    </main>


  );
}
