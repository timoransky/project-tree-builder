import { IconCopy, IconInfoCircle } from "@tabler/icons-react";
import { getParser } from "@/parsers";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface HelpPopupProps {
  activeTab: string;
  applyExample: (parserId: string) => void;
}

export function HelpPopup({ activeTab, applyExample }: HelpPopupProps) {
  const activeParser = getParser(activeTab);

  if (!activeParser) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex items-center cursor-help"
          title="Documentation"
        >
          <IconInfoCircle className="h-5 w-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end" sideOffset={4}>
        <div className="p-4 text-sm">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold">{activeParser.name} Configuration</h4>
            <button
              onClick={() => applyExample(activeParser.id)}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-md"
            >
              <IconCopy size={14} />
              Apply example
            </button>
          </div>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            Use {activeParser.name} to define your tree structure:
          </p>
          {activeParser.helpContent}
        </div>
      </PopoverContent>
    </Popover>
  );
}
