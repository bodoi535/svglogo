import { useQuery } from "@tanstack/react-query";
import { fetchGlobalSearch } from "#/infra/iconify/iconify-client";

export function useGlobalIconSearch(query: string, enabled: boolean, prefixes?: string[]) {
  return useQuery({
    queryKey: ["iconify-global-search", query, prefixes],
    queryFn: () => fetchGlobalSearch(query, prefixes),
    enabled: enabled && !!query,
    staleTime: 1000 * 60 * 5,
  });
}
