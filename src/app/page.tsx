"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { IconBrandGithub } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { InputTabs } from "@/components/input-tabs";
import { CodeEditor } from "@/components/code-editor";
import { TreePreview } from "@/components/tree-preview";
import { HelpPopup } from "@/components/help-popup";
import { ThemeSwitch } from "@/components/theme-switch";
import { Footer } from "@/components/footer";
import { parsers, getParser } from "@/parsers";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("json");
  const [inputs, setInputs] = useState<Record<string, string>>({});
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

  // Initialize with examples
  useEffect(() => {
    // Initialize inputs with examples for each parser
    const initialInputs: Record<string, string> = {};
    parsers.forEach((parser) => {
      initialInputs[parser.id] = parser.example;
    });
    setInputs(initialInputs);

    // Parse the initial input (JSON by default)
    handleParserInput("json", parsers[0].example);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    // Save preference to localStorage
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  const handleParserInput = (parserId: string, value: string) => {
    // Update the input state
    setInputs((prev) => ({
      ...prev,
      [parserId]: value,
    }));

    try {
      // Get the parser and parse the input
      const parser = getParser(parserId);
      if (!parser) {
        setError(`Parser not found: ${parserId}`);
        return;
      }

      const parsed = parser.parse(value);
      setParsedItems(parsed);
      setError("");
    } catch (e: unknown) {
      console.log(e);
      const errorMessage = e instanceof Error ? e.message : "Unknown error";
      setError(errorMessage);
    }
  };

  const applyExample = (parserId: string) => {
    const parser = getParser(parserId);
    if (!parser) return;

    setActiveTab(parserId);
    handleParserInput(parserId, parser.example);
  };

  return (
    <div className="relative isolate">
      <div className="absolute top-6 right-6 flex gap-6 items-center">
        <ThemeSwitch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-gray-900 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-400 transition-colors [&_svg]:size-6"
              >
                <Link
                  href="https://github.com/timoransky/project-tree-builder"
                  target="_blank"
                >
                  <IconBrandGithub className="h-5 w-5" />
                  <span className="sr-only">GitHub Repository</span>
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>View on GitHub</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-col gap-8 items-stretch justify-center pt-14">
        {/* Header */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center py-20 lg:pt-32 lg:pb-24">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-200 sm:text-7xl">
              Project Tree Builder
            </h1>
            <p className="mt-8 text-lg font-medium text-balance text-gray-500 dark:text-gray-400 sm:text-xl/8">
              Create customizable, hierarchical visualizations of your project
              structure. Perfect for documentation, presentations, or showcasing
              code organization.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                onClick={() => {
                  document
                    .getElementById("main-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="absolute -inset-40 z-[-2] opacity-75 [mask-image:radial-gradient(circle_at_center,black_20%,black_20%,transparent_80%)]">
            <svg
              width="32"
              height="32"
              className="text-foreground/[0.05] h-full w-full"
            >
              <defs>
                <pattern
                  id="plus-pattern-:S1:"
                  x="0"
                  y="0"
                  width="16"
                  height="16"
                  patternUnits="userSpaceOnUse"
                >
                  <line
                    x1="8"
                    y1="5"
                    x2="8"
                    y2="11"
                    stroke="currentColor"
                    strokeWidth="1"
                  ></line>
                  <line
                    x1="5"
                    y1="8"
                    x2="11"
                    y2="8"
                    stroke="currentColor"
                    strokeWidth="1"
                  ></line>
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#plus-pattern-:S1:)"
              ></rect>
            </svg>
          </div>

          <div className="absolute inset-0 z-[-1] -translate-y-1/2 translate-x-1/4 blur-[100px] will-change-transform">
            <div className="bg-primary-gradient/20 absolute top-0 right-0 h-[250px] w-[800px] -translate-x-1/5 rounded-full md:h-[300px]"></div>
            <div className="bg-secondary-gradient/40 absolute top-0 right-0 size-[250px] -translate-x-1/3 -translate-y-1/4 rounded-full md:size-[400px] animate-float"></div>
          </div>
        </div>

        {/* Main content area */}
        <div
          id="main-content"
          className="flex flex-col lg:flex-row w-full max-w-7xl items-stretch lg:items-start mx-auto p-4 gap-8"
        >
          {/* Left panel - Code editor */}
          <div className="lg:w-1/2 min-h-screen flex flex-col">
            <div className="flex items-center justify-between">
              <InputTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <HelpPopup activeTab={activeTab} applyExample={applyExample} />
            </div>

            <CodeEditor
              activeTab={activeTab}
              inputs={inputs}
              error={error}
              onInputChange={handleParserInput}
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
