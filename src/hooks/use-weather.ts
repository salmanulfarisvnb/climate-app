import type { Coordinates } from "@/api/types";
import { weatherApi } from "@/api/weather-api";
import { useQuery } from "@tanstack/react-query";

const WEATHER_KEY = {
  weather: (coord: Coordinates) => ["weather", coord] as const,
  forecast: (coord: Coordinates) => ["forecast", coord] as const,
  location: (coord: Coordinates) => ["location", coord] as const,
};

export function useWeatherQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getForecastWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}

export function useLocationQuery(coordinates: Coordinates | null) {
  return useQuery({
    queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherApi.getGeocodingWeather(coordinates) : null,
    enabled: !!coordinates,
  });
}
