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

import Section from "@/components/Tiles/Box";
import { useDashboard } from "@/hooks/api/useGrafanaDashboard";
import LoadingFallback from "@/components/Layout/LoadingFallback";

const DashboardView: React.FC = () => {
  const { data, loading } = useDashboard();

  if (loading || !data) {
    return (
      <LoadingFallback />
    );
  }

  return (
    <div className="screen h-full">
      <br />
      <Section
        title={`Sensor Dashboard: ${data.properties.Name}`}
        footer_date_title=""
        footer_source_title=""
      >
        <div className="text-justify p-2" style={{ height: "90vh" }}>
          <iframe
            src={data.properties.dashboard_url}
            title={`Dashboard: ${data.properties.Name}`}
            width="100%"
            height="100%"
            style={{ border: "none" }}
          />
        </div>
      </Section>
      <br />
    </div>
  );
};

export default DashboardView;
