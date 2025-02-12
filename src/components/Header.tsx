import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { setTheme, theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <header className="border-b sticky top-0 p-3 bg-background">
      <div className="flex items-center justify-between">
        <img
          src="/logo.png"
          loading="lazy"
          alt="weather_logo"
          className="size-14"
        />
        <div>
          {/* searchBar */}
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
        </div>
      </div>
    </header>
  );
};

export default Header;
