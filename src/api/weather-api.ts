import { API_CONFIG } from "./api-config";
import axios from "axios";
import { Coordinates, ForecastData, GeocodingData, WeatherData } from "./types";

class WEATHER_API {
  private createUrl(endPoint: string, params: Record<string, string | number>) {
    const newParams = new URLSearchParams({
      ...params,
      appid: API_CONFIG.API_KEY,
    });
    return `${endPoint}?${newParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    if (!response) {
      throw new Error("Failed to fetch data");
    }
    return response.data;
  }

  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lon: lon.toString(),
      lat: lat.toString(),
      units: API_CONFIG.params.units,
    });

    return this.fetchData<WeatherData>(url);
  }

  async getForecastWeather({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: API_CONFIG.params.units,
    });
    return this.fetchData<ForecastData>(url);
  }

  async getGeocodingWeather({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: 1,
    });
    return this.fetchData<GeocodingData[]>(url);
  }

  async getLocationWeather(query: string): Promise<GeocodingData[]> {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: 5,
    });
    return this.fetchData<GeocodingData[]>(url);
  }
}

export const weatherApi = new WEATHER_API();
