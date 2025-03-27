import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parsers } from "@/parsers";

interface InputTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function InputTabs({ activeTab, setActiveTab }: InputTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="w-full pb-1"
    >
      <TabsList>
        {parsers.map((parser) => (
          <TabsTrigger key={parser.id} value={parser.id}>
            {parser.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
