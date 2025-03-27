import type { FileTreeItem } from "@/types/file-tree-item";
import { Parser } from "@/utils/parser-registry";
import { parseMarkdownToFileTree } from "@/utils/markdown-parser";

const markdownExample = `* project
  * src
    * components
      * header.tsx [selected]
      * footer.tsx
    * **pages**
      * index.tsx
      * about.tsx (About page)
  * package.json [disabled]`;

// Implementation of the Markdown parser
export const markdownParser: Parser = {
  id: "markdown",
  name: "Markdown",
  placeholder:
    "Enter your project structure as Markdown list (or use the example)...",

  parse: (input: string): FileTreeItem[] => {
    try {
      const parsed = parseMarkdownToFileTree(input);

      if (parsed.length > 0) {
        return parsed;
      } else {
        throw new Error(
          "Could not parse Markdown. Make sure to use * or - or + for list items."
        );
      }
    } catch (e: unknown) {
      console.log(e);
      throw new Error("Invalid Markdown format");
    }
  },

  example: markdownExample,

  helpContent: (
    <>
      <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
        <li>
          <strong>* or - or +</strong>: Create list items
        </li>
        <li>
          <strong>Indentation:</strong> Creates nested hierarchy
        </li>
        <li>
          <strong>**bold text**</strong>: Makes text bold
        </li>
        <li>
          <strong>[selected]</strong>: Highlights the item (append to line)
        </li>
        <li>
          <strong>[disabled]</strong>: Grays out the item (append to line)
        </li>
        <li>
          <strong>(tooltip text)</strong>: Adds tooltip (append to line)
        </li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
        {markdownExample}
      </pre>
    </>
  ),
};
