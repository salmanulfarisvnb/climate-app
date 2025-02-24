import type { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";
interface locationDataType {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

function useGeolocation() {
  const [locationData, setLocationData] = useState<locationDataType>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    setLocationData((prv) => ({ ...prv, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        isLoading: false,
        error: "Geo location is not supported in the browser",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "location permission denied. please enable location access";
            break;

          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;

          case error.TIMEOUT:
            errorMessage = "Location request timeout";
            break;

          default:
            errorMessage = "An unknown error occurred";
            break;
        }
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}

export default useGeolocation;
