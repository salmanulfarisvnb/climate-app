import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-location-storage";

export interface HistoryType {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: Date;
}
export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<HistoryType[]>("history", []);

  const historyQuery = useQuery({
    queryKey: ["history"],
    queryFn: () => history,
    initialData: history,
  });
  const queryClient = useQueryClient();

  const addToHistory = useMutation({
    mutationFn: async (search: Omit<HistoryType, "id" | "searchedAt">) => {
      const newSearch: HistoryType = {
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        ...search,
        searchedAt: new Date(),
      };

      const filteredHistory = history.filter(
        (item) => !(item.lat === newSearch.lat && item.lon === newSearch.lon)
      );
      const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (value) => {
      queryClient.setQueryData(["history"], value);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["history"], []);
    },
  });

  return { clearHistory, addToHistory, history: historyQuery.data ?? [] };
}
