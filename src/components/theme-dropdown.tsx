import { IconPalette } from "@tabler/icons-react";
import { themes } from "@/utils/themes";
import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ThemeDropdownProps {
  currentTheme: string;
  setTheme: (themeId: string) => void;
}

export function ThemeDropdown({ currentTheme, setTheme }: ThemeDropdownProps) {
  const currentThemeObj =
    themes.find((theme) => theme.id === currentTheme) || themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-2.5 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <IconPalette className="h-4 w-4" />
          <span className="text-sm">Theme: {currentThemeObj.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={cn(
              theme.id === currentTheme
                ? "bg-accent text-accent-foreground font-medium"
                : ""
            )}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
