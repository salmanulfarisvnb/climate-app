import { Skeleton } from "./ui/skeleton";

const WeatherSkelton = () => {
  return (
    <>
      <div className="flex items-center justify-between grid-cols-4 gap-3">
        <Skeleton className="w-24 h-12 sm:w-40 sm:h-16" />
        <Skeleton className="w-24 h-12 sm:w-40 sm:h-16" />

        <Skeleton className="w-24 h-12 sm:w-40 sm:h-16" />
        <Skeleton className="w-40 h-16 max-sm:hidden" />
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10">
        <Skeleton className="w-full h-[250px] sm:h-[300px]" />
        <Skeleton className="w-full h-[250px]  sm:h-[300px]" />
        <Skeleton className="w-full h-[250px]  sm:h-[300px]" />
        <Skeleton className="w-full h-[250px]  sm:h-[300px]" />
      </div>
    </>
  );
};
export default WeatherSkelton;
