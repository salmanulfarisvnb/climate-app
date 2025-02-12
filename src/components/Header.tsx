import { useTheme } from "@/context/theme-provider";
import { useUser } from "@/context/userContext";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  const { setTheme, theme } = useTheme();
  const { user, setUser } = useUser();

  const isDark = theme === "dark";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  return (
    <header className="sticky top-0 p-3 border-b bg-background/75 supports-[backdrop-filter]:bg-background/60 backdrop-blur">
      <div className="flex items-center justify-between">
        <img
          src="/logo.png"
          loading="lazy"
          alt="weather_logo"
          className="size-10 sm:size-14"
        />
        <div className="flex items-center gap-4">
          {/* searchBar */}
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
