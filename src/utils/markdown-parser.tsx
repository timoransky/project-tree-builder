import type { FileTreeItem } from "@/types/file-tree-item";

export function parseMarkdownToFileTree(markdown: string): FileTreeItem[] {
  const lines = markdown.split("\n").filter((line) => line.trim());
  const result: FileTreeItem[] = [];

  // Stack to keep track of the current path in the tree
  const stack: { indent: number; items: FileTreeItem[] }[] = [
    { indent: -1, items: result },
  ];

  for (const line of lines) {
    const trimmedLine = line.trimStart();
    const indent = line.length - trimmedLine.length;

    // Find matching list item marker (* or - or +)
    const match = trimmedLine.match(/^(\*|\-|\+)\s+(.*)$/);
    if (!match) continue;

    const content = match[2];

    // Check for bold text - **bold** or __bold__
    const boldMatch = content.match(/^(?:\*\*|__)([^*_]+)(?:\*\*|__)(.*)$/);
    let name = content;
    let isBold = false;

    if (boldMatch) {
      name = boldMatch[1];
      isBold = true;
      if (boldMatch[2]) name += boldMatch[2];
    }

    // Check for selected: [selected]
    const isSelected = /\[selected\]/.test(name);
    name = name.replace(/\s*\[selected\]\s*/, "");

    // Check for disabled: [disabled]
    const isDisabled = /\[disabled\]/.test(name);
    name = name.replace(/\s*\[disabled\]\s*/, "");

    // Check for tooltip: (tooltip text)
    let tooltip: string | undefined;
    const tooltipMatch = name.match(/\s*\(([^)]+)\)\s*$/);
    if (tooltipMatch) {
      tooltip = tooltipMatch[1];
      name = name.replace(/\s*\([^)]+\)\s*$/, "");
    }

    // Create file tree item
    const item: FileTreeItem = { name: name.trim() };
    if (isBold) item.isBold = true;
    if (isSelected) item.isSelected = true;
    if (isDisabled) item.isDisabled = true;
    if (tooltip) item.tooltip = tooltip;

    // Find the appropriate parent based on indentation
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];

    // Add as a child
    if (!parent.items.some((i) => i.name === item.name)) {
      // Initialize children array if this item might have children
      item.children = [];
      parent.items.push(item);

      // Push to stack for potential children
      stack.push({ indent, items: item.children });
    }
  }

  // Clean up empty children arrays
  const cleanupEmptyChildren = (items: FileTreeItem[]): void => {
    for (const item of items) {
      if (item.children && item.children.length === 0) {
        delete item.children;
      } else if (item.children) {
        cleanupEmptyChildren(item.children);
      }
    }
  };

  cleanupEmptyChildren(result);

  return result;
}
