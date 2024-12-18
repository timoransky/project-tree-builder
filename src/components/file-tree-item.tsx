import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import {
  IconArrowNarrowRight,
  IconFile,
  IconFolderOpen,
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
            className={cn("py-2 px-3 pr-10 flex items-center relative gap-2", {
              "opacity-20": item.isDisabled,
            })}
          >
            {!!item.children?.length ? (
              <IconFolderOpen stroke={item.isBold ? 1.5 : 1} size={20} />
            ) : (
              <IconFile stroke={item.isBold ? 1.5 : 1} size={20} />
            )}

            {item.name}

            {item.isSelected && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="h-2 w-2 rounded-full bg-sky-500" />
              </div>
            )}
          </div>

          {item.tooltip && (
            <div className="absolute left-[calc(100%+1rem)] flex items-center gap-4 inset-y-0 text-gray-400 dark:text-gray-600">
              <IconArrowNarrowRight stroke={1} />
              <Card>
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
            {item.children.map((child) => (
              <FileTreeItem key={child.name} item={child} indent={indent + 1} />
            ))}
          </FileTree>
        </li>
      )}
    </>
  );
}
