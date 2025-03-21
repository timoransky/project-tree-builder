import { useRef } from "react";
import { Card } from "./card";
import { FileTree } from "./file-tree";
import { FileTreeItem } from "./file-tree-item";
import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import { IconDownload } from "@tabler/icons-react";
import domtoimage from "dom-to-image";

interface TreePreviewProps {
  parsedItems: FileTreeItemType[];
}

export function TreePreview({ parsedItems }: TreePreviewProps) {
  const fileTreeRef = useRef<HTMLDivElement>(null);

  const hasTooltip = (items: FileTreeItemType[]): boolean => {
    return !!items.some(
      (item) => item.tooltip || (item.children && hasTooltip(item.children))
    );
  };

  const exportAsImage = async () => {
    if (!fileTreeRef.current) return;

    try {
      // Wait for fonts to load
      await document.fonts.ready;

      const node = fileTreeRef.current;

      // Use dom-to-image which handles fonts better
      const dataUrl = await domtoimage.toPng(node, {
        quality: 1.0,
        style: {
          transform: "scale(3)",
          "transform-origin": "top left",
        },
        width: node.offsetWidth * 3,
        height: node.offsetHeight * 3,
      });

      // Download the image
      const link = document.createElement("a");
      link.download = "project-tree.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export image:", err);
    }
  };

  return (
    <div className="lg:w-1/2 flex sticky top-4 items-center justify-center">
      <div className="relative w-full">
        <div className="flex items-end justify-between pb-2">
          <p className="text-gray-600 dark:text-gray-400">Tree preview:</p>
          <button
            onClick={exportAsImage}
            className="p-2 rounded-md shadow-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 transition-colors flex items-center gap-1"
            title="Export as PNG image"
          >
            <IconDownload className="h-4 w-4" />
            <span className="text-sm">Export as image</span>
          </button>
        </div>
        <div className="border border-gray-100 dark:border-gray-100/10">
          <div
            className="p-10 bg-white dark:bg-gray-900 w-full"
            ref={fileTreeRef}
          >
            <Card
              className={cn({
                "md:w-[calc(50%-1rem)] max-md:w-full": hasTooltip(parsedItems),
              })}
            >
              <FileTree>
                {parsedItems.map((item, index) => (
                  <FileTreeItem key={index} item={item} />
                ))}
              </FileTree>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
