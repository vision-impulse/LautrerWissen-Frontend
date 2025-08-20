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

import { ExternalLink } from 'lucide-react';

const LegendBox: React.FC<{ legends: Record<string, string> }> = ({ legends }) => {
  if (Object.keys(legends).length === 0) return null;

  return (
    <div className="absolute bottom-11 right-2 bg-white shadow-md rounded-lg p-3 space-y-2 max-w-xs">
      <h3 className="text-sm font-bold text-gray-700">Legende</h3>
      {Object.entries(legends).map(([layer, url]) => (
        <div key={layer} className="text-xs">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-main-map hover:underline flex items-center space-x-1"
          >
            <span>{layer}</span>
            <ExternalLink className="ml-1 h-3 w-3 opacity-100 group-hover:opacity-100" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default LegendBox;