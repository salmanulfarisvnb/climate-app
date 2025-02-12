import { useUser } from "@/context/userContext";
import WeatherDashboard from "@/pages/WeatherDashboard";
import { Navigate } from "react-router";

const ProtectRoute = () => {
  const { user } = useUser();

  return user ? <WeatherDashboard /> : <Navigate to="/login" />;
};

export default ProtectRoute;
