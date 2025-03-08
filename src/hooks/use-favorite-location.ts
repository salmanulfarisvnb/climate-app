import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-location-storage";

export interface FavoritesType {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  addedAt: Date;
}
export default function useFavoriteCities() {
  const queryClient = useQueryClient();
  const [favorites, setFavorites] = useLocalStorage<FavoritesType[]>(
    "favorite-location",
    []
  );

  const favoriteQuery = useQuery({
    queryKey: ["favorite-location"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const addToFavorites = useMutation({
    mutationFn: async (search: Omit<FavoritesType, "id" | "addedAt">) => {
      const newFavorite: FavoritesType = {
        id: `${search.lat}-${search.lon}`,
        lat: search.lat,
        lon: search.lon,
        country: search.country,
        name: search.name,
        state: search.state,
        addedAt: new Date(),
      };
      const filteredFavorite = favorites.filter(
        (item) => !(item.lat === search.lat && item.lon == search.lon)
      );

      const newFavorites = [newFavorite, ...filteredFavorite];
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: (value) => {
      queryClient.setQueryData(["favorite-location"], value);
    },
  });

  const removeFromFavorites = useMutation({
    mutationFn: async (id: string) => {
      const filteredFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(filteredFavorites);
      return filteredFavorites;
    },
    onSuccess: (value) => {
      queryClient.setQueryData(["favorite-location"], value);
    },
  });
  const isFavorite = (lat: number, lon: number) =>
    favorites.some((item) => item.lat === lat && item.lon === lon);
  return {
    favorites: favoriteQuery.data ?? [],
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
}
