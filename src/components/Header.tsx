import { useTheme } from "@/context/theme-provider";
import { useUser } from "@/context/userContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import CitySearch from "./CitySearch";
import { Link } from "react-router";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { user, setUser } = useUser();

  const isDark = theme === "dark";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
    toast.success("Logout successful! Stay safe. 🔒");
  };

  return (
    <header className="sticky z-[1000] top-0 p-3 border-b bg-background/75 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      <div className="flex items-center justify-between">
        <motion.div
          className="perspective-1000"
          animate={{ rotateY: [0, 180, 260, 360] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        >
          <Link to={"/"}>
            {" "}
            <img
              src="/logo.png"
              loading="lazy"
              alt="weather_logo"
              className=" size-10 sm:size-14"
            />
          </Link>
        </motion.div>

        <div className="flex items-center gap-4">
          <CitySearch />

          <p className="tracking-tighter capitalize">{user}</p>

          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={` transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className={`text-yellow-400 size-6`} />
            ) : (
              <Moon className="text-blue-400 size-6" />
            )}
          </div>
          {user && (
            <Button
              className="font-bold"
              onClick={handleLogout}
              variant={"outline"}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
