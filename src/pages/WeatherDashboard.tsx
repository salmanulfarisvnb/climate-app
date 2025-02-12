import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
interface User {
  name: string;
  phoneNumber: string;
}
const WeatherDashboard = () => {
  const [user, setUser] = useState<User>({
    name: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const newUser = JSON.parse(localStorage.getItem("user") || "");
    if (newUser) {
      setUser(newUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ name: "", phoneNumber: "" });
    navigate("/");
  };

  return (
    <div className="flex justify-between">
      <div>Dashboard</div>
      <div>
        {user.name && (
          <div className="flex items-center gap-4">
            <p className="capitalize text-lg font-bold">{user.name}</p>
            <Button onClick={handleLogout} variant={"outline"}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
