import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";

import {Button} from "./ui/button";
import {cn} from "@/lib/utils";

export function ModeToggle() {
  const {theme, setTheme} = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      size="icon"
      variant="link"
      onClick={handleToggle}>
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
          theme === "dark" ? "opacity-0" : "opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
          theme === "light" ? "opacity-0" : "opacity-100"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
