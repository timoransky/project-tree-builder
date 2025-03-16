import { cn } from "@/utils/cn";

export type InputTabType = "json" | "html" | "markdown";

interface InputTabsProps {
  activeTab: InputTabType;
  setActiveTab: (tab: InputTabType) => void;
}

export function InputTabs({ activeTab, setActiveTab }: InputTabsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => setActiveTab("json")}
        className={cn(
          "px-4 py-2 rounded-t-md transition-colors",
          activeTab === "json"
            ? "bg-white dark:bg-gray-800 text-teal-500 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
      >
        JSON
      </button>
      <button
        onClick={() => setActiveTab("html")}
        className={cn(
          "px-4 py-2 rounded-t-md transition-colors",
          activeTab === "html"
            ? "bg-white dark:bg-gray-800 text-teal-500 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
      >
        HTML
      </button>
      <button
        onClick={() => setActiveTab("markdown")}
        className={cn(
          "px-4 py-2 rounded-t-md transition-colors",
          activeTab === "markdown"
            ? "bg-white dark:bg-gray-800 text-teal-500 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
        )}
      >
        Markdown
      </button>
    </div>
  );
}
