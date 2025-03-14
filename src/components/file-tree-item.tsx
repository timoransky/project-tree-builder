import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import {
  IconArrowNarrowRight,
  IconFile,
  IconFolderOpen,
  IconFunction,
  IconLayoutSidebar,
} from "@tabler/icons-react";
import { Card } from "./card";
import { FileTree } from "./file-tree";

export function FileTreeItem({
  item,
  indent = 0,
}: {
  item: FileTreeItemType;
  indent?: number;
}) {
  return (
    <>
      <li>
        <div
          className={cn("relative", {
            "pl-4": indent === 1,
            "pl-8": indent === 2,
            "pl-12": indent === 3,
            "pl-16": indent === 4,
            "pl-20": indent === 5,
            "pl-24": indent === 6,
            "pl-28": indent === 7,
            "bg-gray-100/90 dark:bg-gray-800/60": item.isDisabled,
            "font-semibold": item.isBold,
          })}
        >
          <div
            className={cn(
              "py-2 px-3 pr-10 flex items-center relative gap-2 leading-normal",
              {
                "opacity-20": item.isDisabled,
              }
            )}
          >
            {(() => {
              // Prioritize icon if present
              if (item.icon) {
                switch (item.icon) {
                  case "function":
                    return (
                      <IconFunction stroke={item.isBold ? 1.5 : 1} size={20} />
                    );
                  case "folder":
                    return (
                      <IconFolderOpen
                        stroke={item.isBold ? 1.5 : 1}
                        size={20}
                      />
                    );
                  case "layout":
                    return (
                      <IconLayoutSidebar
                        stroke={item.isBold ? 1.5 : 1}
                        size={20}
                      />
                    );
                  case "file":
                  default:
                    return (
                      <IconFile stroke={item.isBold ? 1.5 : 1} size={20} />
                    );
                }
              }

              // If no icon but has children, use folder icon
              if (item.children?.length) {
                return (
                  <IconFolderOpen stroke={item.isBold ? 1.5 : 1} size={20} />
                );
              }

              // Default to file icon
              return <IconFile stroke={item.isBold ? 1.5 : 1} size={20} />;
            })()}

            {item.name}

            {item.isSelected && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="h-2 w-2 rounded-full bg-sky-500 " />
              </div>
            )}
          </div>

          {item.tooltip && (
            <div className="hidden md:flex absolute left-[calc(100%+1rem)] w-[calc(100%+1rem)] items-center gap-4 inset-y-0 text-gray-400 dark:text-gray-600">
              <IconArrowNarrowRight stroke={1} />
              <Card className="w-full">
                <div className="text-sm py-2 px-3 flex items-center gap-2">
                  {item.tooltip}
                </div>
              </Card>
            </div>
          )}
        </div>
      </li>
      {item.children && (
        <li>
          <FileTree>
            {item.children.map((child, index) => (
              <FileTreeItem key={index} item={child} indent={indent + 1} />
            ))}
          </FileTree>
        </li>
      )}
    </>
  );
}
