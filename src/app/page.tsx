"use client";
import { Card } from "@/components/card";
import { FileTree } from "@/components/file-tree";
import { FileTreeItem } from "@/components/file-tree-item";
import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import { IconInfoCircle, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedItems, setParsedItems] = useState<FileTreeItemType[]>([]);
  const [error, setError] = useState<string>("");

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

  const applyExample = () => {
    handleJsonInput(jsonExample);
  };

  const hasTooltip = (items: FileTreeItemType[]): boolean => {
    return !!items.some(
      (item) => item.tooltip || (item.children && hasTooltip(item.children))
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center  font-[family-name:var(--font-geist-sans)]">
      <div className="flex w-full container items-stretch min-h-screen p-4">
        <Card className="w-1/2 p-4 relative">
          <div className="absolute -right-8 top-0 group">
            <IconInfoCircle
              className="text-gray-400 hover:text-gray-600 cursor-help"
              size={20}
            />
            <div className="hidden group-hover:block absolute left-0 pl-8 top-0 z-20 w-96">
              <Card className="p-4 text-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold">JSON Structure</h4>
                  <button
                    onClick={applyExample}
                    className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md"
                  >
                    <IconCopy size={14} />
                    Apply example
                  </button>
                </div>
                <p className="mb-2 text-gray-600 dark:text-gray-400">
                  Available properties:
                </p>
                <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
                  <li>name: string (required)</li>
                  <li>children: array of items</li>
                  <li>isBold: boolean</li>
                  <li>isSelected: boolean</li>
                  <li>isDisabled: boolean</li>
                  <li>tooltip: string</li>
                </ul>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
                  {jsonExample}
                </pre>
              </Card>
            </div>
          </div>
          <textarea
            className="w-full h-full relative z-10 p-2 font-mono text-sm border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={jsonInput}
            onChange={(e) => handleJsonInput(e.target.value)}
            placeholder="Paste your file tree JSON here..."
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </Card>

        {parsedItems.length > 0 && (
          <div className="w-1/2 flex items-center justify-center">
            <div className="p-10">
              <Card
                className={cn("w-auto", {
                  "mr-[calc(256px+2rem)]": hasTooltip(parsedItems),
                })}
              >
                <FileTree>
                  {parsedItems.map((item) => (
                    <FileTreeItem key={item.name} item={item} />
                  ))}
                </FileTree>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
