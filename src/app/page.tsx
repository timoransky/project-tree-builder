"use client";
import { Card } from "@/components/card";
import { FileTree } from "@/components/file-tree";
import { FileTreeItem } from "@/components/file-tree-item";
import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import {
  IconInfoCircle,
  IconCopy,
  IconBrandGithub,
  IconDownload,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

const jsonExample = `[
  {
    name: "my-project",
    children: [
      {
        name: "src",
        isBold: true,
        children: [
          {
            name: "app",
            isSelected: true,
            children: [
              {
                name: "page.tsx",
                tooltip: "Main page component"
              }
            ]
          },
          {
            name: "components",
            children: [
              {
                name: "...",
                isDisabled: true
              }
            ]
          }
        ]
      }
    ]
  }
]`;

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on system preference or saved preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check local storage first
      const savedTheme = localStorage.getItem("theme");

      // If there's a saved preference, use that
      if (savedTheme) {
        const isDark = savedTheme === "dark";
        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
      } else {
        // Otherwise use system preference
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setDarkMode(isDarkMode);
        document.documentElement.classList.toggle("dark", isDarkMode);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    // Save preference to localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const [jsonInput, setJsonInput] = useState(jsonExample);
  const [parsedItems, setParsedItems] = useState<FileTreeItemType[]>([]);
  const [error, setError] = useState<string>("");
  const fileTreeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleJsonInput(jsonExample);
  }, []);

  const convertToValidJSON = (str: string): string => {
    // Add quotes to unquoted keys
    return str.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
  };

  const handleJsonInput = (value: string) => {
    setJsonInput(value);
    try {
      // Preprocess the input before parsing
      const validJSON = convertToValidJSON(value);
      const parsed = JSON.parse(validJSON);

      console.log(parsed);

      if (Array.isArray(parsed)) {
        setParsedItems(parsed);
        setError("");
      } else {
        setParsedItems([]);
        setError("Input must be an array");
      }
    } catch (e: unknown) {
      console.log(e);
      setError("Invalid JSON format");
    }
  };

  const applyExample = () => {
    handleJsonInput(jsonExample);
  };

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

      // Fallback to html2canvas if dom-to-image fails
      try {
        alert(
          "Using fallback export method. This might not render fonts correctly."
        );
        const canvas = await html2canvas(fileTreeRef.current, {
          backgroundColor:
            getComputedStyle(fileTreeRef.current).backgroundColor || "#ffffff",
          scale: 2,
        });

        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.download = "project-tree.png";
        link.href = image;
        link.click();
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
        alert("Failed to export image. Please try a different browser.");
      }
    }
  };

  return (
    <div className="relative isolate pt-14">
      <div className="absolute top-6 right-6 flex gap-6 items-center">
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
        <Link
          href="https://github.com/timoransky/project-tree-builder"
          target="_blank"
          className="text-gray-900 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
        >
          <IconBrandGithub className="h-7 w-7" />
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-teal-500 to-pink-500 opacity-30 sm:w-[72.1875rem]"
        />
      </div>

      <div className="flex flex-col gap-8 items-center justify-center font-[family-name:var(--font-geist-sans)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center py-20 lg:pt-32 lg:pb-24">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-200 sm:text-7xl">
              Project Tree Builder
            </h1>
            <p className="mt-8 text-lg font-medium text-balance text-gray-500 dark:text-gray-400 sm:text-xl/8">
              Create customizable, hierarchical visualizations of your project
              structure. Perfect for documentation, presentations, or showcasing
              code organization.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full max-w-7xl items-stretch min-h-screen p-4 gap-8">
          <Card className="lg:w-1/2 relative p-0">
            <div className="absolute -right-8 top-0 group">
              <IconInfoCircle
                className="text-gray-400 hover:text-gray-600 cursor-help"
                size={20}
              />
              <div className="hidden group-hover:block absolute left-0 pl-8 top-0 z-20 w-96">
                <Card className="p-4 text-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">JSON Configuration</h4>
                    <button
                      onClick={applyExample}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md"
                    >
                      <IconCopy size={14} />
                      Apply example
                    </button>
                  </div>
                  <p className="mb-2 text-gray-600 dark:text-gray-400">
                    Customize your tree with these properties:
                  </p>
                  <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
                    <li>
                      <strong>name:</strong> string (required)
                    </li>
                    <li>
                      <strong>icon:</strong> string (optional, one of `folder`,
                      `file`, `function`, `layout`)
                    </li>
                    <li>
                      <strong>children:</strong> array of nested items
                    </li>
                    <li>
                      <strong>isBold:</strong> boolean - makes text bold
                    </li>
                    <li>
                      <strong>isSelected:</strong> boolean - highlights the item
                    </li>
                    <li>
                      <strong>isDisabled:</strong> boolean - grays out the item
                    </li>
                    <li>
                      <strong>tooltip:</strong> string - adds a tooltip message
                    </li>
                  </ul>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
                    {jsonExample}
                  </pre>
                </Card>
              </div>
            </div>
            <textarea
              className="w-full min-h-60 h-full relative z-10 p-4 font-mono text-sm rounded-md dark:bg-gray-800"
              value={jsonInput}
              onChange={(e) => handleJsonInput(e.target.value)}
              placeholder="Enter your project structure as JSON (or use the example)..."
            />
            {error && <div className="text-red-500 mt-2 p-2">{error}</div>}
          </Card>

          {parsedItems.length > 0 && (
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="relative w-full">
                <div className="flex items-end justify-between pb-2">
                  <p className="text-gray-600 dark:text-gray-400">
                    Tree preview:
                  </p>
                  <button
                    onClick={exportAsImage}
                    className="p-2 bg-white dark:bg-gray-800 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-1"
                    title="Export as PNG image"
                  >
                    <IconDownload className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Export as image
                    </span>
                  </button>
                </div>
                <div
                  className="p-10 bg-white border border-gray-100/10 dark:bg-gray-900 w-full"
                  ref={fileTreeRef}
                  id="file-tree-container"
                >
                  <Card
                    className={cn({
                      "md:w-[calc(50%-1rem)] max-md:w-full":
                        hasTooltip(parsedItems),
                    })}
                  >
                    <FileTree>
                      {parsedItems.map((item, index) => (
                        <FileTreeItem key={index} item={item} />
                      ))}
                    </FileTree>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with attribution */}
        <div className="w-full py-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Crafted with ❤️‍🔥 by{" "}
            <Link
              href="https://janci.dev"
              target="_blank"
              className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
            >
              janci.dev
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
