import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

const WeatherDashboard = () => {
  return (
    <div>
      {/* favoriteCities */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">MyLocation</h1>
        <Button
          // onClick={handleRefresh}
          // disabled={}
          variant={"outline"}
          size={"icon"}
        >
          <RefreshCcw />
        </Button>
      </div>
    </div>
  );
};

export default WeatherDashboard;
