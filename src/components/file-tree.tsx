import { cn } from "@/utils/cn";

export function FileTree({
  children,
  className,
  dividerColor,
}: {
  children: React.ReactNode;
  className?: string;
  dividerColor?: string;
}) {
  return (
    <ul className={cn("divide-y", dividerColor || "divide-gray-400/30", className)}>{children}</ul>
  );
}
