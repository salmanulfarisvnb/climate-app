import useFavoriteCities from "@/hooks/use-favorite-location";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWeatherQuery } from "@/hooks/use-weather";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CircleX, Loader } from "lucide-react";
import { formatTemp } from "@/util/format-temp";

const FavoritesCity = () => {
  const { favorites, removeFromFavorites } = useFavoriteCities();
  if (favorites.length < 1) return null;
  const handleClose = (id: string) => {
    removeFromFavorites.mutate(id);
  };
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tighter">Favorite Cities</h1>
      <ScrollArea className="w-full rounded-md whitespace-nowrap">
        <div className="flex gap-4 w-max ">
          {favorites.map((item) => (
            <FavoritesCitiesTablet
              key={item.id}
              onClose={() => handleClose(item.id)}
              {...item}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
};

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onClose: () => void;
}
function FavoritesCitiesTablet({
  name,
  lat,
  lon,
  onClose,
}: FavoriteCityTabletProps) {
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });
  const weatherDetails = {
    icon: weather?.weather[0].icon,
    name: name,
    country: weather?.sys.country,
    temp: weather ? `${formatTemp(weather.main.temp)}` : "",
    description: weather?.weather[0].description,
  };

  const randomDuration = Math.floor(Math.random() * 2000) + 1500;

  return (
    <Card
      style={{ animationDuration: `${randomDuration}ms` }}
      className={`relative shadow-md p-2 animate-pulse w-[300px]`}
    >
      <CardContent className="p-0">
        {isLoading ? (
          <div className="relative flex items-center justify-center">
            <Loader className="absolute transform -translate-x-1/2 -translate-y-1/2 opacity-75 animate-spin-slow top-1/2 left-1/2" />
          </div>
        ) : weather ? (
          <>
            <div className="flex items-center justify-between gap-3 py-4">
              <div className="flex items-center ">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@4x.png`}
                  alt={weatherDetails.description}
                  className="object-cover size-20"
                />
                <div className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold">{weatherDetails.name}</h2>
                  <span className="text-muted-foreground">
                    {weatherDetails.country}
                  </span>
                </div>
              </div>
              <div className="flex flex-col flex-wrap justify-end gap-5">
                <h1 className="text-xl font-bold text-center">
                  {weatherDetails.temp}
                </h1>
                <span className=" text-muted-foreground">
                  {weatherDetails.description}
                </span>
              </div>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              variant={"ghost"}
              size={"icon"}
              className="absolute border-none right-1 top-1 size-7"
            >
              <CircleX className="size-2" />
            </Button>
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}
export default FavoritesCity;
