import { CurrentWeatherWithSlide } from "@/components/CurrentWeather";
import FavoriteButton from "@/components/FavoriteButton";
import { HourlyTemperatureWithSlide } from "@/components/HourlyTemperature";
import WeatherSkelton from "@/components/loading-skelton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WeatherDetailsWithSlide } from "@/components/WeatherDetails";
import { WeatherForecastWithSlide } from "@/components/WeatherForcast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

const CityPage = () => {
  const { cityName } = useParams();
  const [searchParams] = useSearchParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = {
    lat,
    lon,
  };

  const currentWeather = useWeatherQuery(coordinates);
  const forecastWeather = useForecastQuery(coordinates);

  const handleRefresh = () => {
    if (coordinates) {
      currentWeather.refetch();
      forecastWeather.refetch();
    }
  };

  if (currentWeather.error || !cityName) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error !</AlertTitle>
        <AlertDescription className="flex flex-col">
          <p>Filed to fetch data. Please try again.</p>
          <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
            <RefreshCcw className="mr-2 size-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (
    currentWeather.isLoading ||
    forecastWeather.isLoading ||
    !forecastWeather.data ||
    !currentWeather.data
  ) {
    return <WeatherSkelton />;
  }

  return (
    <div>
      <div className="flex items-center justify-between text-2xl font-bold tracking-tighter capitalize">
        <Card className="inline px-4 py-3">{cityName}</Card>
        <FavoriteButton data={currentWeather.data} name={cityName} />
      </div>
      <div className="grid gap-4 mt-3">
        <div className="flex flex-col gap-3 lg:flex-row">
          <CurrentWeatherWithSlide data={currentWeather.data} />
          <HourlyTemperatureWithSlide data={forecastWeather.data} />
        </div>
        <div className="grid items-start gap-4 md:grid-cols-2">
          <WeatherDetailsWithSlide data={currentWeather.data} />

          <WeatherForecastWithSlide data={forecastWeather.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
