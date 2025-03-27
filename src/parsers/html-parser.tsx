import type { FileTreeItem } from "@/types/file-tree-item";
import { Parser } from "@/utils/parser-registry";

const htmlExample = `<ul>
  <li>project
    <ul>
      <li>src
        <ul>
          <li>components
            <ul>
              <li class="selected">header.tsx</li>
              <li>footer.tsx</li>
            </ul>
          </li>
          <li><strong>pages</strong>
            <ul>
              <li>index.tsx</li>
              <li title="About page">about.tsx</li>
            </ul>
          </li>
        </ul>
      </li>
      <li class="disabled">package.json</li>
    </ul>
  </li>
</ul>`;

// Implementation of the HTML parser
export const htmlParser: Parser = {
  id: "html",
  name: "HTML",
  placeholder:
    "Enter your project structure as HTML list (or use the example)...",

  parse: (input: string): FileTreeItem[] => {
    try {
      // Parse HTML to FileTreeItem structure
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      const rootList = doc.querySelector("ul");

      if (!rootList) {
        throw new Error("Invalid HTML format. Need a <ul> element");
      }

      return parseHtmlListToFileTree(rootList);
    } catch (e: unknown) {
      console.log(e);
      throw new Error("Invalid HTML format");
    }
  },

  example: htmlExample,

  helpContent: (
    <>
      <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
        <li>
          <strong>&lt;ul&gt; and &lt;li&gt;:</strong> create the tree hierarchy
        </li>
        <li>
          <strong>&lt;strong&gt;</strong> or{" "}
          <strong>class=&quot;bold&quot;</strong>: makes text bold
        </li>
        <li>
          <strong>class=&quot;selected&quot;</strong>: highlights the item
        </li>
        <li>
          <strong>class=&quot;disabled&quot;</strong>: grays out the item
        </li>
        <li>
          <strong>title=&quot;...&quot;</strong>: adds a tooltip message
        </li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
        {htmlExample}
      </pre>
    </>
  ),
};

// Helper function to parse HTML list elements into FileTreeItem objects
const parseHtmlListToFileTree = (ul: HTMLElement): FileTreeItem[] => {
  const items: FileTreeItem[] = [];

  ul.querySelectorAll(":scope > li").forEach((li) => {
    const item: FileTreeItem = {
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
