import { WithSlideAnimation } from "@/hoc/animation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ForecastData } from "@/api/types";
import { formatTime } from "@/util/formatDate";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { formatTemp } from "@/util/format-temp";

interface ForecastProps {
  data: ForecastData;
}
interface ForecastDetailsProps {
  date: string;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  description: string;
}

const WeatherForecast = ({ data }: ForecastProps) => {
  const dailyForecast = data.list.reduce((acc, list) => {
    const date = formatTime(list.dt, "EEE, MMM d");
    if (!acc[date]) {
      acc[date] = {
        date,
        temp_min: list.main.temp_min,
        temp_max: list.main.temp_max,
        humidity: list.main.humidity,
        wind: list.wind.speed,
        description: list.weather[0].description,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, list.main.temp_min);
    }
    return acc;
  }, {} as Record<string, ForecastDetailsProps>);

  const nextDays = Object.values(dailyForecast);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl">5 Day Forecast</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {nextDays.map((days) => (
          <div
            key={days.date}
            className="grid items-center justify-between grid-cols-3 gap-3 p-4 border rounded-md shadow-sm"
          >
            <div>
              <p className="text-sm font-bold">{days.date}</p>
              <p className="text-sm capitalize text-muted-foreground">
                {days.description}
              </p>
            </div>
            <div className="flex justify-end gap-3 md:flex-col max-sm:flex-col lg:flex-row">
              <div className="flex items-center text-sm text-blue-600">
                <ArrowDown className="size-4" />
                <p>{formatTemp(days.temp_min)}</p>
              </div>
              <div className="flex items-center text-sm text-red-600">
                <ArrowUp className="size-4" />
                <p>{formatTemp(days.temp_max)}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center">
                <Droplets className="text-blue-400 size-4" />
                <p className="text-sm">{days.humidity}%</p>
              </div>
              <div className="flex items-center">
                <Wind className="text-blue-400 size-4" />
                <p className="text-sm">{days.wind}/s</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
export const WeatherForecastWithSlide = WithSlideAnimation(WeatherForecast, {
  delay: 1.2,
  className: "flex-1",
});
