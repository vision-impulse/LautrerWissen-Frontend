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

'use client';

import { useState, useEffect } from "react";
import { useElectionResults } from '@/hooks/api/useElectionResults';
import { useFirstElection } from '@/hooks/api/useFirstElection';
import { GroupedResult } from '@/types/api';
import { Spinner } from '@/components/Elements/Spinner'
import { ElectionGroupDropdown } from '@/features/elections/ElectionDropdown';
import Section from '@/components/Tiles/Box';
import ResultTable from '@/features/elections/ElectionResultTable';
import ElectionTurnout from '@/features/elections/ElectionTurnout';
import VerticalBarChart from '@/features/elections/ElectionResultBarPlot';

import { useSearchParams } from 'next/navigation';
import geojsonData from '@/assets/polygons.json';
import SubNavHeader from "@/components/Layout/SubNavHeader";
import LoadingFallback from "@/components/Layout/LoadingFallback";

type PartyResult = {
  Name: string;
  Direktstimme: string | null;
  Zweitstimme: string | null;
};

interface ElectionResult {
  result_table: PartyResult[];
  direct_votes: Record<string, string>;
  secondary_votes: Record<string, string>;
}

export default function ElectionView() {
  const searchParams = useSearchParams();
  const districtParam = searchParams.get('district_id');

  const { firstElectionId, loading: loadingElectionId, error } = useFirstElection();

  const [selectedResult, setSelectedResult] = useState<ElectionResult | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<"GEMEINDE" | "BRIEFWAHLBEZIRK" | "STADTTEIL">("GEMEINDE");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  // Only call useElectionResults when firstElectionId is available
  const { data: apiData, isLoading } = useElectionResults(firstElectionId ?? undefined);

  const feature = geojsonData.features.find(
    (f) => districtParam !== null && parseInt(districtParam) === f.properties.ID
  );
  const districtName = feature?.properties?.Name.replace(/\s+/g, '') ?? "";
  const breadcrumbs = districtName
    ? [
      { label: 'Startseite', href: '/' },
      { label: districtName, href: '/districts?ID=' + districtParam },
      { label: 'Wahlergebnisse', href: '' },
    ]
    : [
      { label: 'Startseite', href: '/' },
      { label: 'Wahlergebnisse', href: '' },
    ];

  useEffect(() => {
    if (!apiData || !districtName || !districtParam) return;

    const grouped = apiData.results_grouped["STADTTEIL"];
    if (!grouped) return;

    const match = grouped.find((entry) => entry.name === districtName);

    if (match) {
      setSelectedGroup("STADTTEIL"); // Ensure the correct group is selected!
      setSelectedId(match.id);       // Set matching ID
    } else {
      setSelectedGroup("GEMEINDE");
      setSelectedId(grouped[0].id); // fallback to first if not found
    }
  }, [apiData, districtName, districtParam]);

  // Once selectedGroup and selectedId are set, parse result data
  useEffect(() => {
    if (!apiData) return;

    const groupData = apiData.results_grouped[selectedGroup];
    if (!groupData || groupData.length === 0) return;

    const resultToUse = selectedId
      ? groupData.find((item) => item.id === selectedId)
      : groupData[0];

    if (resultToUse) {
      const parsed = JSON.parse(resultToUse.result_data) as ElectionResult;
      setSelectedResult(parsed);
      setSelectedName(resultToUse.name);
    }
  }, [selectedGroup, selectedId, apiData]);

  if (isLoading || !apiData || !selectedResult) {
    return (
      <div className='grow'>
        <SubNavHeader breadcrumbs={breadcrumbs} />
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div className='grow'>
      <SubNavHeader breadcrumbs={breadcrumbs} />
      <main className="grow max-w-screen-xl mx-auto">
        <div className="px-4 sm:px-6 lg:px-4 w-full max-w-9xl mx-auto">
          <div className="mt-6 mb-3 min-h-screen">
            <Section
              title="Ergebnisübersicht der Bundestagswahl 2025"
              footer_date_title=""
              footer_source_title="Stadtverwaltung Kaiserslautern (Wahlen)"
            >
              <br />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-0">
                <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
                  <h2 className="text-xl text-main-heading font-semibold mb-0">
                    Auswahl der Ergebnisse
                  </h2>
                  <h3 className="text-sm mb-8">
                    {selectedName}
                  </h3>
                  <ElectionGroupDropdown
                    apiData={apiData}
                    selectedGroup={selectedGroup}
                    selectedId={selectedId}
                    setSelectedGroup={(group: string) => setSelectedGroup(group as "GEMEINDE" | "BRIEFWAHLBEZIRK" | "STADTTEIL")}
                    setSelectedId={setSelectedId}
                  />
                </div>
                <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
                  <h2 className="text-xl text-main-heading font-semibold mb-0">
                    Informationen zur Wahl
                  </h2>
                  <h3 className="text-sm mb-8">
                    {selectedName}
                  </h3>
                  <ElectionTurnout data={selectedResult.result_table} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
                <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
                  <h2 className="text-xl text-main-heading font-semibold mb-0">
                    Verteilung der Erststimmen
                  </h2>
                  <h3 className="text-sm mb-4">
                    {selectedName}
                  </h3>
                  <VerticalBarChart data={selectedResult.direct_votes} />
                </div>
                <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
                  <h2 className="text-xl text-main-heading font-semibold mb-0">
                    Verteilung der Zweitstimmen
                  </h2>
                  <h3 className="text-sm mb-4">
                    {selectedName}
                  </h3>
                  <VerticalBarChart data={selectedResult.secondary_votes} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-3">
                <div className="bg-white dark:bg-white p-3 rounded-lg border border-gray-200">
                  <h2 className="text-xl text-main-heading font-semibold mb-0">
                    Ergebnisübersicht
                  </h2>
                  <h3 className="text-sm mb-4">
                    {selectedName}
                  </h3>
                  <ResultTable data={selectedResult.result_table} />
                </div>
              </div>
              <br />
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
}
