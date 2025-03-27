import type { FileTreeItem } from "@/types/file-tree-item";
import { Parser } from "@/utils/parser-registry";

const jsonExample = `[
  {
    "name": "project",
    "children": [
      {
        "name": "src",
        "children": [
          {
            "name": "components",
            "children": [
              { "name": "header.tsx", "isSelected": true },
              { "name": "footer.tsx" }
            ]
          },
          {
            "name": "pages",
            "isBold": true,
            "children": [
              { "name": "index.tsx" },
              { "name": "about.tsx", "tooltip": "About page" }
            ]
          }
        ]
      },
      { "name": "package.json", "isDisabled": true }
    ]
  }
]`;

// Helper function to convert JS objects with unquoted keys to valid JSON
const convertToValidJSON = (str: string): string => {
  // Add quotes to unquoted keys
  return str.replace(/([{,]\s*)([a-zA-Z0-9_]+)\s*:/g, '$1"$2":');
};

// Implementation of the JSON parser
export const jsonParser: Parser = {
  id: "json",
  name: "JSON",
  placeholder: "Enter your project structure as JSON (or use the example)...",

  parse: (input: string): FileTreeItem[] => {
    try {
      // Preprocess the input before parsing
      const validJSON = convertToValidJSON(input);
      const parsed = JSON.parse(validJSON);

      if (Array.isArray(parsed)) {
        return parsed;
      } else {
        throw new Error("Input must be an array");
      }
    } catch (e: unknown) {
      console.log(e);
      throw new Error("Invalid JSON format");
    }
  },

  example: jsonExample,

  helpContent: (
    <>
      <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
        <li>
          <strong>name:</strong> string (required)
        </li>
        <li>
          <strong>icon:</strong> string (optional, one of `folder`, `file`,
          `function`, `layout`)
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
    </>
  ),
};
