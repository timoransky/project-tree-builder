import { Card } from "./card";
import { cn } from "@/utils/cn";
import { InputTabType } from "./input-tabs";

interface CodeEditorProps {
  activeTab: InputTabType;
  jsonInput: string;
  htmlInput: string;
  error: string;
  onJsonChange: (value: string) => void;
  onHtmlChange: (value: string) => void;
}

export function CodeEditor({
  activeTab,
  jsonInput,
  htmlInput,
  error,
  onJsonChange,
  onHtmlChange,
}: CodeEditorProps) {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeTab === "json") {
      onJsonChange(e.target.value);
    } else if (activeTab === "html") {
      onHtmlChange(e.target.value);
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
          value={activeTab === "json" ? jsonInput : htmlInput}
          onChange={onChange}
          placeholder={
            activeTab === "json"
              ? "Enter your project structure as JSON (or use the example)..."
              : "Enter your project structure as HTML list (or use the example)..."
          }
        />
      </Card>
      {error && <div className="text-red-500 mt-2 p-2">{error}</div>}
    </>
  );
}
