import { CurrentWeatherWithSlide } from "@/components/CurrentWeather";
import { HourlyTemperatureWithSlide } from "@/components/HourlyTemperature";
import WeatherSkelton from "@/components/loading-skelton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { WeatherDetailsWithSlide } from "@/components/WeatherDetails";
import { WeatherForecastWithSlide } from "@/components/WeatherForcast";
import useGeolocation from "@/hooks/use-geolocation";
import {
  useForecastQuery,
  useLocationQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertCircle, MapPin, RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: geolocationLoading,
  } = useGeolocation();

  //QUERIES...
  const currentWeather = useWeatherQuery(coordinates);
  const forecastWeather = useForecastQuery(coordinates);
  const locationWeather = useLocationQuery(coordinates);

  console.log(forecastWeather.data);

  const locationState = locationWeather.data?.[0];

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      currentWeather.refetch();
      forecastWeather.refetch();
      locationWeather.refetch();
    }
  };

  if (geolocationLoading) {
    return <WeatherSkelton />;
  }

  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error !</AlertTitle>
        <AlertDescription className="flex flex-col">
          <p>{locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 size-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error !</AlertTitle>
        <AlertDescription className="flex flex-col">
          <p>Please enable location access and see your local weather</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 size-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (currentWeather.error || forecastWeather.error) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error !</AlertTitle>
        <AlertDescription className="flex flex-col">
          <p>Filed to fetch data. Please try again.</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <RefreshCcw className="mr-2 size-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!currentWeather.data || !forecastWeather.data) {
    return <WeatherSkelton />;
  }
  return (
    <div>
      {/* favoriteCities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>

        <Button
          onClick={handleRefresh}
          disabled={currentWeather.isFetching || forecastWeather.isFetching}
          variant={"outline"}
          size={"icon"}
        >
          <RefreshCcw
            className={`size-4 ${
              currentWeather.isFetching ? "animate-spin" : null
            }`}
          />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col gap-3 lg:flex-row">
          <CurrentWeatherWithSlide
            data={currentWeather.data}
            locationState={locationState}
          />
          <HourlyTemperatureWithSlide data={forecastWeather.data} />
        </div>
        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetailsWithSlide data={currentWeather.data} />

          <WeatherForecastWithSlide data={forecastWeather.data} />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
