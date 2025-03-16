import { IconSun, IconMoon } from "@tabler/icons-react";

interface ThemeSwitchProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function ThemeSwitch({ darkMode, toggleDarkMode }: ThemeSwitchProps) {
  return (
    <button
      onClick={toggleDarkMode}
      className="text-gray-900 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? (
        <IconSun className="h-7 w-7" />
      ) : (
        <IconMoon className="h-7 w-7" />
      )}
    </button>
  );
}
