import { useUser } from "@/context/userContext";
import { Navigate, Outlet } from "react-router";

const ProtectRoute = () => {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
