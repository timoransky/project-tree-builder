import { Card } from "./card";
import { IconCopy, IconInfoCircle } from "@tabler/icons-react";
import { InputTabType } from "./input-tabs";

interface HelpPopupProps {
  activeTab: InputTabType;
  jsonExample: string;
  htmlExample: string;
  markdownExample: string;
  applyJsonExample: () => void;
  applyHtmlExample: () => void;
  applyMarkdownExample: () => void;
}

export function HelpPopup({
  activeTab,
  jsonExample,
  htmlExample,
  markdownExample,
  applyJsonExample,
  applyHtmlExample,
  applyMarkdownExample,
}: HelpPopupProps) {
  const getExampleHandler = () => {
    switch (activeTab) {
      case "json":
        return applyJsonExample;
      case "html":
        return applyHtmlExample;
      case "markdown":
        return applyMarkdownExample;
      default:
        return () => {};
    }
  };

  const getConfigTitle = () => {
    switch (activeTab) {
      case "json":
        return "JSON Configuration";
      case "html":
        return "HTML List Configuration";
      case "markdown":
        return "Markdown List Configuration";
      default:
        return "";
    }
  };

  const getDescription = () => {
    switch (activeTab) {
      case "json":
        return "Customize your tree with these properties:";
      case "html":
        return "Use HTML lists to define your tree structure:";
      case "markdown":
        return "Use Markdown lists to define your tree structure:";
      default:
        return "";
    }
  };

  return (
    <div className="group relative">
      <button
        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center cursor-help"
        title="Documentation"
      >
        <IconInfoCircle className="h-5 w-5 pb-1" />
      </button>
      <div className="hidden group-hover:block absolute left-full pl-4 top-0 z-20 w-96">
        <Card className="p-4 text-sm">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold">{getConfigTitle()}</h4>
            <button
              onClick={getExampleHandler()}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md"
            >
              <IconCopy size={14} />
              Apply example
            </button>
          </div>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            {getDescription()}
          </p>
          {activeTab === "json" ? (
            <>
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
            </>
          ) : activeTab === "html" ? (
            <>
              <ul className="list-disc pl-4 mb-4 text-gray-600 dark:text-gray-400">
                <li>
                  <strong>&lt;ul&gt; and &lt;li&gt;:</strong> create the tree
                  hierarchy
                </li>
                <li>
                  <strong>&lt;strong&gt;</strong> or{" "}
                  <strong>class=&quot;bold&quot;</strong>: makes text bold
                </li>
                <li>
                  <strong>class=&quot;selected&quot;</strong>: highlights the
                  item
                </li>
                <li>
                  <strong>class=&quot;disabled&quot;</strong>: grays out the
                  item
                </li>
                <li>
                  <strong>title=&quot;...&quot;</strong>: adds a tooltip message
                </li>
              </ul>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
                {htmlExample}
              </pre>
            </>
          ) : (
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
                  <strong>[selected]</strong>: Highlights the item (append to
                  line)
                </li>
                <li>
                  <strong>[disabled]</strong>: Grays out the item (append to
                  line)
                </li>
                <li>
                  <strong>(tooltip text)</strong>: Adds tooltip (append to line)
                </li>
              </ul>
              <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-xs overflow-auto">
                {markdownExample}
              </pre>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
