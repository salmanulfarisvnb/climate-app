import useFavoriteCities from "@/hooks/use-favorite-location";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { WeatherData } from "@/api/types";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
  name: string;
}

const FavoriteButton = ({ data, name }: FavoriteButtonProps) => {
  const { addToFavorites, favorites, isFavorite, removeFromFavorites } =
    useFavoriteCities();
  const isCurrentFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleBTN = () => {
    if (isCurrentFavorite) {
      removeFromFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.success("Remove from Favorites");
      return;
    }

    addToFavorites.mutate({
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: data.sys.country,
      name: name,
      state: name,
    });
    toast.success("Add to Favorites");
  };
  console.log(favorites);

  return (
    <Button
      onClick={handleToggleBTN}
      variant={isCurrentFavorite ? "secondary" : "outline"}
      className={`${
        isCurrentFavorite ? "bg-yellow-500 hover:bg-yellow-600" : ""
      }`}
    >
      <Star
        className={`fill-current size-4 ${
          isCurrentFavorite ? "text-black" : ""
        }`}
      />
    </Button>
  );
};

export default FavoriteButton;
