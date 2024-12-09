import { Card } from "@/components/card";
import { FileTree } from "@/components/file-tree";
import { FileTreeItem } from "@/components/file-tree-item";
import type { FileTreeItem as FileTreeItemType } from "@/types/file-tree-item";
import { cn } from "@/utils/cn";
import { IconWorldOff, IconWorldWww } from "@tabler/icons-react";

export default function Home() {
  const itemsStructure: FileTreeItemType[] = [
    {
      name: "my-project",
      children: [
        {
          name: "public",
          children: [
            {
              name: "...",
              type: "file",
              tooltip: "Static files and assets",
              isDisabled: true,
            },
          ],
        },
        {
          name: "src",
          children: [
            {
              name: "app",
              isBold: true,
              children: [
                {
                  name: "...",
                  type: "file",
                  isDisabled: true,
                  tooltip: "Pages and layouts go here",
                },
              ],
            },
            {
              name: "components",
              isBold: true,
              children: [
                {
                  name: "...",
                  type: "file",
                  isDisabled: true,
                },
              ],
            },
            {
              name: "lib",
              isBold: true,
              children: [
                {
                  name: "...",
                  type: "file",
                  isDisabled: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const itemsPages: FileTreeItemType[] = [
    {
      name: "my-project",
      children: [
        {
          name: "src",
          children: [
            {
              name: "app",
              isBold: true,
              children: [
                {
                  name: "page.tsx",
                },
                {
                  name: "layout.tsx",
                },
                {
                  name: "error.tsx",
                  tooltip: "Error UI",
                },
                {
                  name: "loading.tsx",
                  tooltip: "Loading UI",
                },
                {
                  name: "not-found.tsx",
                  tooltip: "404 UI",
                },
                {
                  name: "api",
                  children: [
                    {
                      name: "route.ts",
                      tooltip: "API endpoint (without UI)",
                    },
                  ],
                },
                {
                  name: "dashboard",
                  children: [
                    {
                      name: "page.tsx",
                      tooltip: (
                        <>
                          <IconWorldWww stroke={1} size={20} />
                          <span>/dashboard</span>
                        </>
                      ),
                    },
                    {
                      name: "layout.tsx",
                      tooltip: "Nested layout",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const itemsPages2: FileTreeItemType[] = [
    {
      name: "my-project",
      children: [
        {
          name: "src",
          children: [
            {
              name: "app",
              isBold: true,
              children: [
                {
                  name: "page.tsx",
                },
                {
                  name: "layout.tsx",
                },
                {
                  name: "error.tsx",
                  tooltip: "Error UI",
                },
                {
                  name: "loading.tsx",
                  tooltip: "Loading UI",
                },
                {
                  name: "not-found.tsx",
                  tooltip: "404 UI",
                },
                {
                  name: "article",
                  isSelected: true,
                  children: [
                    {
                      name: "detail.ts",
                      tooltip: (
                        <>
                          <IconWorldOff stroke={1} size={20} />
                          <span>not routable</span>
                        </>
                      ),
                    },
                  ],
                },
                {
                  name: "_dashboard",
                  isSelected: true,
                  children: [
                    {
                      name: "page.tsx",
                      tooltip: (
                        <>
                          <IconWorldOff stroke={1} size={20} />
                          <span>not routable</span>
                        </>
                      ),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const itemsGroups: FileTreeItemType[] = [
    {
      name: "my-project",
      children: [
        {
          name: "src",
          children: [
            {
              name: "app",
              isBold: true,
              children: [
                {
                  name: "(app)",
                  isSelected: true,
                  children: [
                    {
                      name: "layout.tsx",
                    },
                    {
                      name: "shop",
                      children: [
                        {
                          name: "page.tsx",
                          tooltip: (
                            <>
                              <IconWorldWww stroke={1} size={20} />
                              <span>/shop</span>
                            </>
                          ),
                        },
                      ],
                    },
                  ],
                },
                {
                  name: "(auth)",
                  isSelected: true,
                  children: [
                    {
                      name: "layout.tsx",
                    },
                    {
                      name: "profile",
                      children: [
                        {
                          name: "page.tsx",
                          tooltip: (
                            <>
                              <IconWorldWww stroke={1} size={20} />
                              <span>/profile</span>
                            </>
                          ),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const hasTooltip = (items: FileTreeItemType[]): boolean => {
    return !!items.some(
      (item) => item.tooltip || (item.children && hasTooltip(item.children))
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="p-10">
        <Card
          className={cn("mx-4", {
            "mr-[calc(256px+2.5rem)]": hasTooltip(itemsStructure),
          })}
        >
          <FileTree>
            {itemsStructure.map((item) => (
              <FileTreeItem key={item.name} item={item} />
            ))}
          </FileTree>
        </Card>
      </div>

      <div className="p-10">
        <Card
          className={cn("mx-4", {
            "mr-[calc(256px+2.5rem)]": hasTooltip(itemsPages),
          })}
        >
          <FileTree>
            {itemsPages.map((item) => (
              <FileTreeItem key={item.name} item={item} />
            ))}
          </FileTree>
        </Card>
      </div>

      <div className="p-10">
        <Card
          className={cn("mx-4", {
            "mr-[calc(256px+2.5rem)]": hasTooltip(itemsPages2),
          })}
        >
          <FileTree>
            {itemsPages2.map((item) => (
              <FileTreeItem key={item.name} item={item} />
            ))}
          </FileTree>
        </Card>
      </div>

      <div className="p-10">
        <Card
          className={cn("mx-4", {
            "mr-[calc(256px+2.5rem)]": hasTooltip(itemsGroups),
          })}
        >
          <FileTree>
            {itemsGroups.map((item) => (
              <FileTreeItem key={item.name} item={item} />
            ))}
          </FileTree>
        </Card>
      </div>
    </div>
  );
}
