import type { GeocodingData, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";
import { ArrowDown, Droplets, Wind } from "lucide-react";
import { WithSlideAnimation } from "@/hoc/animation";
import { formatTemp } from "@/util/format-temp";

export interface CurrentWeatherProps {
  data: WeatherData;
  locationState?: GeocodingData;
  delayTime?: string;
  className?: string;
}

const CurrentWeather = ({ data, locationState }: CurrentWeatherProps) => {
  const {
    weather: [weatherCondition],
    main: { feels_like, humidity, temp, temp_max, temp_min },
    wind: { speed },
    sys: { country },

    name,
  } = data;

  return (
    <Card className="w-full h-full">
      <CardContent>
        <div className="grid items-center gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            {name && (
              <>
                <div className="p-5">
                  <h1 className="text-2xl font-bold tracking-tighter ">
                    {name}
                    {locationState?.state && (
                      <span className="ml-2 text-base text-muted-foreground">
                        {`${locationState?.state}`}
                      </span>
                    )}
                    <p className="text-base text-muted-foreground">{country}</p>
                  </h1>
                </div>
              </>
            )}
            <div className="flex items-center gap-3">
              <p className="text-5xl font-bold tracking-tight sm:text-6xl">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Feels & likes {formatTemp(feels_like)}
                </p>
                <div className="flex gap-3">
                  <span className="flex items-center text-sm text-blue-500 gap-x-1">
                    <ArrowDown className="size-3" /> {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center text-sm text-red-600 gap-x-1">
                    <ArrowDown className="size-3" /> {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-3">
              <div className="flex items-center gap-2">
                <Droplets className="text-blue-500 size-3" />
                <div className="text-sm">
                  <p className="font-medium">Humidity</p>
                  <p className="text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="text-blue-500 size-3" />
                <div className="text-sm">
                  <p className="font-medium">WindSpeed</p>
                  <p className="text-muted-foreground">{speed}m/s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center">
            <figure className="aspect-square relative flex flex-col w-full justify-center items-center max-w-[200px]">
              <img
                src={`https://openweathermap.org/img/wn/${weatherCondition.icon}@4x.png`}
                alt={weatherCondition.description}
                className="object-contain w-full h-full"
              />
              <figcaption className="absolute font-semibold bottom-4">
                {weatherCondition.description}
              </figcaption>
            </figure>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default CurrentWeather;
export const CurrentWeatherWithSlide = WithSlideAnimation(CurrentWeather);
