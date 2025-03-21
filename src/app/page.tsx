"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";

import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { InputTabs, InputTabType } from "@/components/input-tabs";
import { CodeEditor } from "@/components/code-editor";
import { TreePreview } from "@/components/tree-preview";
import { HelpPopup } from "@/components/help-popup";
import { ThemeSwitch } from "@/components/theme-switch";
import { Footer } from "@/components/footer";
import {
  jsonExample,
  htmlExample,
  markdownExample,
} from "@/components/constants";
import { parseMarkdownToFileTree } from "@/utils/markdown-parser";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<InputTabType>("json");
  const [jsonInput, setJsonInput] = useState(jsonExample);
  const [htmlInput, setHtmlInput] = useState(htmlExample);
  const [markdownInput, setMarkdownInput] = useState(markdownExample);
  const [parsedItems, setParsedItems] = useState<FileTreeItemType[]>([]);
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    handleJsonInput(jsonExample);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    // Save preference to localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

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

  const handleHtmlInput = (value: string) => {
    setHtmlInput(value);
    try {
      // Parse HTML to FileTreeItemType structure
      const parser = new DOMParser();
      const doc = parser.parseFromString(value, "text/html");
      const rootList = doc.querySelector("ul");

      if (!rootList) {
        setError("Invalid HTML format. Need a <ul> element");
        setParsedItems([]);
        return;
      }

      const parsed = parseHtmlListToFileTree(rootList);
      setParsedItems(parsed);
      setError("");
    } catch (e: unknown) {
      console.log(e);
      setError("Invalid HTML format");
    }
  };

  const handleMarkdownInput = (value: string) => {
    setMarkdownInput(value);
    try {
      const parsed = parseMarkdownToFileTree(value);

      if (parsed.length > 0) {
        setParsedItems(parsed);
        setError("");
      } else {
        setParsedItems([]);
        setError(
          "Could not parse Markdown. Make sure to use * or - or + for list items."
        );
      }
    } catch (e: unknown) {
      console.log(e);
      setError("Invalid Markdown format");
    }
  };

  const parseHtmlListToFileTree = (ul: HTMLElement): FileTreeItemType[] => {
    const items: FileTreeItemType[] = [];

    ul.querySelectorAll(":scope > li").forEach((li) => {
      const item: FileTreeItemType = {
        name: li.childNodes[0].textContent?.trim() || "",
      };

      // Check for classes and attributes
      if (li.classList.contains("selected")) {
        item.isSelected = true;
      }
      if (li.classList.contains("disabled")) {
        item.isDisabled = true;
      }
      if (li.hasAttribute("title")) {
        item.tooltip = li.getAttribute("title") || undefined;
      }

      // Check for bold text
      const strongElement = li.querySelector(":scope > strong");
      if (strongElement) {
        item.isBold = true;
        item.name = strongElement.textContent?.trim() || "";
      }

      // Check for nested lists
      const nestedUl = li.querySelector(":scope > ul");
      if (nestedUl) {
        item.children = parseHtmlListToFileTree(nestedUl as HTMLElement);
      }

      items.push(item);
    });

    return items;
  };

  const applyJsonExample = () => {
    setActiveTab("json");
    handleJsonInput(jsonExample);
  };

  const applyHtmlExample = () => {
    setActiveTab("html");
    handleHtmlInput(htmlExample);
  };

  const applyMarkdownExample = () => {
    setActiveTab("markdown");
    handleMarkdownInput(markdownExample);
  };

  return (
    <div className="relative isolate pt-14">
      <div className="absolute top-6 right-6 flex gap-6 items-center">
        <ThemeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Link
          href="https://github.com/timoransky/project-tree-builder"
          target="_blank"
          className="text-gray-900 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
        >
          <IconBrandGithub className="h-7 w-7" />
        </Link>
      </div>

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-teal-400 via-amber-500 to-pink-500 opacity-30 sm:w-[72.1875rem]"
        />
      </div>

      <div className="flex flex-col gap-8 items-stretch justify-center">
        {/* Header */}
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

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row w-full max-w-7xl items-stretch lg:items-start p-4 gap-8">
          {/* Left panel - Code editor */}
          <div className="lg:w-1/2 min-h-screen flex flex-col pt-0.5">
            <div className="flex items-end justify-between">
              <InputTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <HelpPopup
                activeTab={activeTab}
                jsonExample={jsonExample}
                htmlExample={htmlExample}
                markdownExample={markdownExample}
                applyJsonExample={applyJsonExample}
                applyHtmlExample={applyHtmlExample}
                applyMarkdownExample={applyMarkdownExample}
              />
            </div>

            <CodeEditor
              activeTab={activeTab}
              jsonInput={jsonInput}
              htmlInput={htmlInput}
              markdownInput={markdownInput}
              error={error}
              onJsonChange={handleJsonInput}
              onHtmlChange={handleHtmlInput}
              onMarkdownChange={handleMarkdownInput}
            />
          </div>

          {/* Right panel - Tree preview */}
          {parsedItems.length > 0 && <TreePreview parsedItems={parsedItems} />}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
