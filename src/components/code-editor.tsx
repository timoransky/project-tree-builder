import { Card } from "./card";
import { cn } from "@/utils/cn";
import { Textarea } from "@/components/ui/textarea";
import { getParser } from "@/parsers";

interface CodeEditorProps {
  activeTab: string;
  inputs: Record<string, string>;
  error: string;
  onInputChange: (parserId: string, value: string) => void;
}

export function CodeEditor({
  activeTab,
  inputs,
  error,
  onInputChange,
}: CodeEditorProps) {
  const activeParser = getParser(activeTab);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(activeTab, e.target.value);
  };

  return (
    <>
      <Card className="relative p-0 h-full">
        <Textarea
          className={cn(
            "resize-none border-0 shadow-none focus-visible:ring-1 focus-visible:ring-teal-500 block w-full min-h-[calc(100vh-8rem)] h-full relative z-10 p-4 font-mono text-sm rounded-md dark:bg-gray-800",
            {
              "focus-visible:ring-red-500 ring-red-500": error,
            }
          )}
          value={inputs[activeTab] || ""}
          onChange={onChange}
          placeholder={activeParser?.placeholder || ""}
        />
      </Card>
      {error && <div className="text-red-500 mt-2 p-2">{error}</div>}
    </>
  );
}
