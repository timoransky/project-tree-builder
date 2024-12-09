export type FileType = "file" | "function";

export interface FileTreeItem {
  name: string;
  type?: FileType;
  children?: FileTreeItem[];
  isSelected?: boolean;
  isBold?: boolean;
  isDisabled?: boolean;
  tooltip?: string | React.ReactNode;
}
