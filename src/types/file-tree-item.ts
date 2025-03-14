export type FileIconType = "file" | "function" | "folder" | "layout";

export interface FileTreeItem {
  name: string;
  icon?: FileIconType;
  children?: FileTreeItem[];
  isSelected?: boolean;
  isBold?: boolean;
  isDisabled?: boolean;
  tooltip?: string | React.ReactNode;
  onAdd?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
}
