import { useState, useEffect, useRef } from "react";
import { IconPalette } from "@tabler/icons-react";
import { Theme, themes } from "@/utils/themes";
import { cn } from "@/utils/cn";

interface ThemeDropdownProps {
  currentTheme: string;
  setTheme: (themeId: string) => void;
}

export function ThemeDropdown({ currentTheme, setTheme }: ThemeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentThemeObj = themes.find(theme => theme.id === currentTheme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md shadow-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 transition-colors flex items-center gap-1"
        title="Change theme"
      >
        <IconPalette className="h-4 w-4" />
        <span className="text-sm">Theme: {currentThemeObj.name}</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 z-20 min-w-[180px] bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm transition-colors",
                theme.id === currentTheme
                  ? "bg-gray-100 dark:bg-gray-700 text-teal-600 dark:text-teal-400"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              )}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}