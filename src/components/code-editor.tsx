import { Card } from "./card";
import { cn } from "@/utils/cn";
import { InputTabType } from "./input-tabs";

interface CodeEditorProps {
  activeTab: InputTabType;
  jsonInput: string;
  htmlInput: string;
  markdownInput: string;
  error: string;
  onJsonChange: (value: string) => void;
  onHtmlChange: (value: string) => void;
  onMarkdownChange: (value: string) => void;
}

export function CodeEditor({
  activeTab,
  jsonInput,
  htmlInput,
  markdownInput,
  error,
  onJsonChange,
  onHtmlChange,
  onMarkdownChange,
}: CodeEditorProps) {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeTab === "json") {
      onJsonChange(e.target.value);
    } else if (activeTab === "html") {
      onHtmlChange(e.target.value);
    } else if (activeTab === "markdown") {
      onMarkdownChange(e.target.value);
    }
  };

  const getInputValue = () => {
    switch (activeTab) {
      case "json":
        return jsonInput;
      case "html":
        return htmlInput;
      case "markdown":
        return markdownInput;
      default:
        return "";
    }
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case "json":
        return "Enter your project structure as JSON (or use the example)...";
      case "html":
        return "Enter your project structure as HTML list (or use the example)...";
      case "markdown":
        return "Enter your project structure as Markdown list (or use the example)...";
      default:
        return "";
    }
  };

  return (
    <>
      <Card className="relative p-0 h-full">
        <textarea
          className={cn(
            "resize-none focus:border-none focus:ring-1 ring-teal-500 focus:outline-none block w-full min-h-[calc(100vh-8rem)] h-full relative z-10 p-4 font-mono text-sm rounded-md dark:bg-gray-800",
            {
              "ring-red-500": error,
            }
          )}
          value={getInputValue()}
          onChange={onChange}
          placeholder={getPlaceholder()}
        />
      </Card>
      {error && <div className="text-red-500 mt-2 p-2">{error}</div>}
    </>
  );
}
