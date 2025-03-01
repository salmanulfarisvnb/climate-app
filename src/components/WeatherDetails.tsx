import { WeatherData } from "@/api/types";
import { WithSlideAnimation } from "@/hoc/animation";
import { formatTime } from "@/util/formatDate";
import { getWindDirection } from "@/util/weatherDirection";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
interface WeatherDetailsProps {
  data: WeatherData;
}
const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { sys, wind, main } = data;
  const details = [
    {
      title: "Sunrise",
      icon: <Sunrise />,
      value: formatTime(sys.sunrise),
      color: "text-green-500",
    },
    {
      title: "Sunset",
      icon: <Sunset />,
      value: formatTime(sys.sunset),
      color: "text-blue-500",
    },
    {
      title: "WindDirection",
      icon: <Compass />,
      value: `${getWindDirection(wind.deg)}(${wind.deg}°) `,
      color: "text-fuchsia-500",
    },
    {
      title: "Pressure",
      icon: <Gauge />,
      value: `${main.pressure} hPa`,
      color: "text-violet-500",
    },
  ];
  return (
    <Card className="w-full h-full cursor-pointer">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tighter">
          Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {details.map((item) => (
            <div
              className="flex items-center gap-3 p-2 border rounded-md shadow-md"
              key={item.value}
            >
              <span className={`${item.color}`}>{item.icon}</span>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tighter sm:text-base ">
                  {item.title}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
export const WeatherDetailsWithSlide = WithSlideAnimation(WeatherDetails, {
  delay: 0.9,
  // className: "min-w-[500px]",
});
