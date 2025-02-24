import { WithSlideAnimation } from "@/hoc/animation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HourlyTemperatureProps {
  data: ForecastData;
}
const HourlyTemperature = ({ data }: HourlyTemperatureProps) => {
  const charts = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="text-2xl">Hourly Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[200px]">
          <ResponsiveContainer height={"100%"} width={"100%"}>
            <LineChart data={charts}>
              <XAxis
                dataKey="time"
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                fontSize={13}
              />
              <YAxis
                stroke="#888888"
                tickLine={false}
                axisLine={false}
                fontSize={13}
                tickFormatter={(value) => `${value}°`}
              />

              <Line
                type={"monotone"}
                dataKey="temp"
                stroke=" #800000"
                dot={false}
              />
              <Line
                type={"monotone"}
                dataKey="feels_like"
                stroke=" #64748b"
                dot={false}
                strokeDasharray="5 5"
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="grid grid-cols-2 gap-3 p-3 rounded-lg shadow-sm bg-background">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            Temperature
                          </span>
                          <span className="font-bold">{payload[0].value}°</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-muted-foreground">
                            FeelsLikes
                          </span>
                          <span className="font-bold">{payload[1].value}°</span>
                        </div>
                      </div>
                    );
                  }
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyTemperature;
export const HourlyTemperatureWithSlide = WithSlideAnimation(
  HourlyTemperature,
  { delay: 0.6, className: "flex-1 " }
);
