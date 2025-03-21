// Theme definitions for the file tree preview
export interface Theme {
  id: string;
  name: string;
  cardBackground: string;
  previewBackground: string;
  textColor: string;
  dividerColor: string;
  selectionDotColor: string;
  borderColor: string;
  cardShadow: string;
  iconColor: string; // Unified icon color
  itemHoverEffect: string;
  disabledBackground: string;
  disabledOpacity: string;
}

export const themes: Theme[] = [
  {
    id: "default",
    name: "Default",
    cardBackground: "bg-white dark:bg-gray-900",
    previewBackground: "bg-white dark:bg-gray-900",
    textColor: "text-gray-700 dark:text-gray-400",
    dividerColor: "divide-gray-400/30",
    selectionDotColor: "bg-sky-500",
    borderColor: "border-gray-400/30",
    cardShadow: "shadow-xl",
    iconColor: "text-gray-500 dark:text-gray-400",
    itemHoverEffect: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50",
    disabledBackground: "bg-gray-100/90 dark:bg-gray-800/60",
    disabledOpacity: "opacity-40"
  },
  {
    id: "ocean",
    name: "Ocean Depths",
    cardBackground: "bg-gradient-to-br from-cyan-50 to-white dark:from-blue-950 dark:to-cyan-950",
    previewBackground: "bg-gradient-to-br from-blue-100 to-cyan-200 dark:from-blue-900 dark:to-cyan-900",
    textColor: "text-blue-950 dark:text-blue-100",
    dividerColor: "divide-blue-200 dark:divide-blue-800",
    selectionDotColor: "bg-blue-500",
    borderColor: "border-blue-200 dark:border-blue-700",
    cardShadow: "shadow-xl shadow-blue-100/50 dark:shadow-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
    itemHoverEffect: "hover:bg-blue-50/70 dark:hover:bg-blue-800/30",
    disabledBackground: "bg-blue-50/50 dark:bg-blue-900/30",
    disabledOpacity: "opacity-50"
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    cardBackground: "bg-gradient-to-br from-amber-50 to-white dark:from-amber-950 dark:to-rose-950",
    previewBackground: "bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-900 dark:to-rose-900",
    textColor: "text-amber-950 dark:text-amber-100",
    dividerColor: "divide-amber-200 dark:divide-amber-800",
    selectionDotColor: "bg-amber-500",
    borderColor: "border-amber-200 dark:border-amber-700",
    cardShadow: "shadow-xl shadow-amber-100/50 dark:shadow-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    itemHoverEffect: "hover:bg-amber-50/70 dark:hover:bg-amber-800/30",
    disabledBackground: "bg-amber-50/50 dark:bg-amber-900/30",
    disabledOpacity: "opacity-50"
  },
  {
    id: "forest",
    name: "Enchanted Forest",
    cardBackground: "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950 dark:to-teal-950",
    previewBackground: "bg-gradient-to-br from-emerald-100 to-teal-200 dark:from-emerald-900 dark:to-teal-900",
    textColor: "text-emerald-950 dark:text-emerald-100",
    dividerColor: "divide-emerald-200 dark:divide-emerald-800",
    selectionDotColor: "bg-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-700",
    cardShadow: "shadow-xl shadow-emerald-100/50 dark:shadow-emerald-900/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    itemHoverEffect: "hover:bg-emerald-50/70 dark:hover:bg-emerald-800/30",
    disabledBackground: "bg-emerald-50/50 dark:bg-emerald-900/30",
    disabledOpacity: "opacity-50"
  }
];