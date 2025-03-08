import { Clock, Loader, Search, Star } from "lucide-react";
import { Button } from "./ui/button";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { useState } from "react";
import { useLocationNameQuery } from "@/hooks/use-weather";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useNavigate } from "react-router";
import { formatDate } from "@/util/formatDate";
import useFavoriteCities from "@/hooks/use-favorite-location";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";

const CitySearch = () => {
  const { user } = useUser();

  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate();

  // HOOKS
  const { data: locationQuery, isLoading } = useLocationNameQuery(query);
  const { addToHistory, history, clearHistory } = useSearchHistory();
  const { favorites } = useFavoriteCities();

  const handleAuthorized = () => {
    if (!user) {
      toast.error(
        "Please Log In\nYou need to log in to continue. Log in and try again."
      );
    } else {
      setOpen(!open);
    }
  };

  const handleSelect = (args: string) => {
    const [lat, lon, name, country, state] = args.split("|");
    addToHistory.mutate({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
      name,
      state,
    });
    setOpen(false);
    navigate(`/city-page/${name}?lat=${lat}&lon=${lon}`);
  };
  console.log(favorites);

  return (
    <>
      <Button
        onClick={handleAuthorized}
        variant={"outline"}
        className="flex items-center justify-start w-full sm:pl-0 text-muted-foreground sm:w-25 md:w-44"
      >
        <Search className="sm:ml-3 size-4" />
        <span className="text-sm max-sm:hidden">Search City...</span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          onValueChange={setQuery}
          value={query}
          placeholder="Type your city name..."
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {favorites && favorites.length > 0 && (
            <CommandGroup>
              {isLoading && (
                <div className="pl-3 mt-3 size-4">
                  <Loader className="animate-pulse" />
                </div>
              )}

              <h4 className="text-sm">Favorites</h4>

              {favorites.map((location) => (
                <CommandItem
                  key={location.id}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}|${location.state}`}
                  onSelect={handleSelect}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="space-x-3">
                      <Star className="inline-flex items-center mr-3 text-yellow-500 size-4" />
                      {location.name}
                      {location.state && (
                        <span className="text-xs text-muted-foreground">
                          {location.state},
                        </span>
                      )}{" "}
                      <span className="text-xs text-muted-foreground">
                        {location.country}
                      </span>
                    </div>
                    <p>{formatDate(location.addedAt, "MMM dd, h:mm a")}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {history && history.length > 0 && (
            <CommandGroup>
              {isLoading && (
                <div className="pl-3 mt-3 size-4">
                  <Loader className="animate-pulse" />
                </div>
              )}
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm">Recent Searches</h4>
                <Button
                  onClick={() => clearHistory.mutate()}
                  variant={"ghost"}
                  size={"sm"}
                >
                  Clear
                </Button>
              </div>
              {history.map((location) => (
                <CommandItem
                  key={location.id}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}|${location.state}`}
                  onSelect={handleSelect}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="space-x-3">
                      <Clock className="inline-flex items-center mr-3 size-4" />
                      {location.name}
                      {location.state && (
                        <span className="text-xs text-muted-foreground">
                          {location.state},
                        </span>
                      )}{" "}
                      <span className="text-xs text-muted-foreground">
                        {location.country}
                      </span>
                    </div>
                    <p>{formatDate(location.searchedAt, "MMM d, h:mm a")}</p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {locationQuery && locationQuery.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="pl-3 mt-3 size-4">
                    <Loader className="animate-pulse" />
                  </div>
                )}
                {locationQuery.map((location) => (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}|${location.state}`}
                    onSelect={handleSelect}
                  >
                    <span>
                      <Search className="size-4" />
                    </span>
                    {location.name}
                    {location.state && (
                      <span className="text-xs text-muted-foreground">
                        {location.state},
                      </span>
                    )}{" "}
                    <span className="text-xs text-muted-foreground">
                      {location.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
