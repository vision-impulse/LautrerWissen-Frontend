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

import CookieConsent from 'react-cookie-consent'

export default function Cookies() {
  return (
    <CookieConsent
      buttonStyle={{
        background: '#aab315',
        color: '#fff',
        borderRadius: '4px',
      }}
      buttonText="Akzeptieren"
      declineButtonStyle={{
        borderRadius: '4px',
      }}
      declineButtonText="Ablehnen"
      enableDeclineButton
      style={{
        background: '#003d6f',
      }}
    >
      Einwilligung zu Cookies (Analytics, Tracking)
    </CookieConsent>
  )
}
