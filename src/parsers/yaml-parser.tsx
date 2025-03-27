import type { FileTreeItem } from "@/types/file-tree-item";
import { Parser } from "@/utils/parser-registry";

const yamlExample = `- name: project
  children:
    - name: src
      children:
        - name: components
          children:
            - name: header.tsx
              isSelected: true
            - name: footer.tsx
        - name: pages
          isBold: true
          children:
            - name: index.tsx
            - name: about.tsx
              tooltip: About page
    - name: package.json
      isDisabled: true`;

// Implementation of the YAML parser
export const yamlParser: Parser = {
  id: "yaml",
  name: "YAML",
  placeholder: "Enter your project structure as YAML (or use the example)...",
  parse: (input: string): FileTreeItem[] => {
    try {
      // Parse YAML string to JavaScript object
      const parsed = parseYaml(input);

      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        throw new Error("Input must be a YAML array");
      }
    } catch (e: unknown) {
      console.log(e);
      throw new Error("Invalid YAML format");
    }
  },
  example: yamlExample,
  helpContent: (
    <>
      <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
        <li>
          <strong>name:</strong> string (required)
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
        <li>
          <strong>icon:</strong> string - one of &apos;folder&apos;,
          &apos;file&apos;, &apos;function&apos;, &apos;layout&apos;
        </li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
        {yamlExample}
      </pre>
    </>
  ),
};

// Simple YAML parser implementation
// This is a basic implementation that could be replaced with a proper YAML library
const parseYaml = (input: string): FileTreeItem[] => {
  // Split input into lines and filter out empty lines
  const lines = input.split("\n").filter((line) => line.trim() !== "");

  // Helper function to determine the indentation level
  const getIndentationLevel = (line: string): number => {
    const match = line.match(/^(\s*)/);
    return match ? match[1].length : 0;
  };

  // Helper function to parse a YAML line
  const parseLine = (line: string): { key: string; value: unknown } => {
    line = line.trimStart();

    // Check if it's a list item
    if (line.startsWith("- ")) {
      line = line.substring(2);
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) {
      return { key: line.trim(), value: null };
    }

    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();

    // Parse special values
    if (value === "true") return { key, value: true };
    if (value === "false") return { key, value: false };
    if (value === "null" || value === "") return { key, value: null };
    if (!isNaN(Number(value))) return { key, value: Number(value) };

    return { key, value };
  };

  // Helper function to safely set properties on FileTreeItem
  const setProperty = (
    item: FileTreeItem,
    key: string,
    value: unknown
  ): void => {
    // Type guard for specific properties
    if (key === "name" && typeof value === "string") {
      item.name = value;
    } else if (key === "children" && Array.isArray(value)) {
      item.children = value as FileTreeItem[];
    } else if (key === "isSelected" && typeof value === "boolean") {
      item.isSelected = value;
    } else if (key === "isBold" && typeof value === "boolean") {
      item.isBold = value;
    } else if (key === "isDisabled" && typeof value === "boolean") {
      item.isDisabled = value;
    } else if (key === "tooltip" && typeof value === "string") {
      item.tooltip = value;
    } else if (key === "icon" && typeof value === "string") {
      // Validate that value is a valid FileIconType
      if (["file", "function", "folder", "layout"].includes(value)) {
        item.icon = value as "file" | "function" | "folder" | "layout";
      }
    }
    // Ignore unknown properties
  };

  // Main parsing function
  const parseTree = (
    startIndex: number,
    minIndent: number
  ): [FileTreeItem[], number] => {
    const result: FileTreeItem[] = [];
    let i = startIndex;
    let currentItem: FileTreeItem | null = null;

    while (i < lines.length) {
      const line = lines[i];
      const indentLevel = getIndentationLevel(line);

      if (indentLevel < minIndent) {
        break;
      }

      // Check if it's a new item in an array
      if (line.trimStart().startsWith("- ")) {
        if (currentItem) {
          result.push(currentItem);
        }
        currentItem = { name: "" }; // Initialize with required property

        const { key, value } = parseLine(line);
        setProperty(currentItem, key, value);
        i++;
      }
      // Check if it's a property
      else if (line.includes(":")) {
        const { key, value } = parseLine(line);

        // Check if it has children
        if (
          i + 1 < lines.length &&
          getIndentationLevel(lines[i + 1]) > indentLevel
        ) {
          const [children, nextIndex] = parseTree(i + 1, indentLevel + 2);
          if (currentItem) {
            setProperty(currentItem, key, children);
          }
          i = nextIndex;
        } else {
          if (currentItem) {
            setProperty(currentItem, key, value);
          }
          i++;
        }
      } else {
        i++;
      }
    }

    if (currentItem) {
      result.push(currentItem);
    }

    return [result, i];
  };

  const [result] = parseTree(0, 0);
  return result;
};
