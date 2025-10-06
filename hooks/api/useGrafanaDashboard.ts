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

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchDashboard, getDashboards } from "@/api/grafanaDashboards";
import { GrafanaDashboardAPIResponse, GrafanaDashboardListItem } from "@/types/api";

import { usePaginatedData, PaginationParams } from './usePaginatedData';


export const useDashboardList = (params: PaginationParams) =>
  usePaginatedData<GrafanaDashboardListItem>(params, getDashboards);


export function useDashboard() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [data, setData] = useState<GrafanaDashboardAPIResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadDashboard = async () => {
      try {
        const dashboard = await fetchDashboard(id);
        setData(dashboard);
      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === "Dashboard not found") {
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [id, router]);

  return { data, loading };
}
