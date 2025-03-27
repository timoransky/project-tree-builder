import { useRef, useState, useEffect } from "react";
import { Card } from "./card";
import { FileTree } from "./file-tree";
import { FileTreeItem } from "./file-tree-item";
import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import { IconDownload, IconSun, IconMoon } from "@tabler/icons-react";
import domtoimage from "dom-to-image";
import { ThemeDropdown } from "./theme-dropdown";
import { themes } from "@/utils/themes";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TreePreviewProps {
  parsedItems: FileTreeItemType[];
}

export function TreePreview({ parsedItems }: TreePreviewProps) {
  const fileTreeRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference and dark mode from localStorage on component mount
  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem("treeTheme");
    if (savedTheme && themes.some((t) => t.id === savedTheme)) {
      setCurrentTheme(savedTheme);
    }

    // Load dark mode setting
    if (typeof window !== "undefined") {
      // Check local storage first
      const savedTheme = localStorage.getItem("theme");

      // If there's a saved preference, use that
      if (savedTheme) {
        const isDark = savedTheme === "dark";
        setDarkMode(isDark);
      } else {
        // Otherwise use system preference
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(isDarkMode);
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    // Save preference to localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  // Save theme preference to localStorage when it changes
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("treeTheme", themeId);
  };

  // Get current theme object
  const theme = themes.find((t) => t.id === currentTheme) || themes[0];

  const hasTooltip = (items: FileTreeItemType[]): boolean => {
    return !!items.some(
      (item) => item.tooltip || (item.children && hasTooltip(item.children))
    );
  };

  const exportAsImage = async () => {
    if (!fileTreeRef.current) return;

    try {
      // Wait for fonts to load
      await document.fonts.ready;

      const node = fileTreeRef.current;

      // Use dom-to-image which handles fonts better
      const dataUrl = await domtoimage.toPng(node, {
        quality: 1.0,
        style: {
          transform: "scale(3)",
          "transform-origin": "top left",
        },
        width: node.offsetWidth * 3,
        height: node.offsetHeight * 3,
      });

      // Download the image
      const link = document.createElement("a");
      link.download = "project-tree.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image:", err);
    }
  };

  return (
    <div className="lg:w-1/2 flex sticky top-4 items-center justify-center">
      <div className="relative w-full">
        <div className="flex items-center justify-between pb-1 pt-1">
          <p className="text-gray-600 dark:text-gray-400">Tree preview:</p>
          <div className="flex items-center gap-2">
            <ThemeDropdown
              currentTheme={currentTheme}
              setTheme={handleThemeChange}
            />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="h-9 px-2.5 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {darkMode ? (
                      <IconSun className="h-4 w-4" />
                    ) : (
                      <IconMoon className="h-4 w-4" />
                    )}
                    <span className="text-sm">
                      {darkMode ? "Light" : "Dark"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {darkMode ? "Switch to light mode" : "Switch to dark mode"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportAsImage}
                    className="h-9 px-2.5 flex items-center gap-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <IconDownload className="h-4 w-4" />
                    <span className="text-sm">Export</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Export as PNG image
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div
          className={cn("border rounded-md overflow-hidden", theme.borderColor)}
        >
          <div
            className={cn("p-10 w-full", theme.previewBackground)}
            ref={fileTreeRef}
          >
            <Card
              className={cn({
                "md:w-[calc(50%-1rem)] max-md:w-full": hasTooltip(parsedItems),
              })}
              themeBackground={theme.cardBackground}
              themeText={theme.textColor}
              themeBorder={theme.borderColor}
              themeShadow={theme.cardShadow}
            >
              <FileTree dividerColor={theme.dividerColor}>
                {parsedItems.map((item, index) => (
                  <FileTreeItem
                    key={index}
                    item={item}
                    selectionDotColor={theme.selectionDotColor}
                    themeBackground={theme.cardBackground}
                    themeText={theme.textColor}
                    themeBorder={theme.borderColor}
                    themeShadow={theme.cardShadow}
                    dividerColor={theme.dividerColor}
                    iconColor={theme.iconColor}
                    itemHoverEffect={theme.itemHoverEffect}
                    disabledBackground={theme.disabledBackground}
                    disabledOpacity={theme.disabledOpacity}
                  />
                ))}
              </FileTree>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
