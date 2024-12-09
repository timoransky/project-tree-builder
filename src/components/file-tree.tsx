import { cn } from "@/utils/cn";

export function FileTree({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn("divide-y divide-gray-400/30", className)}>{children}</ul>
  );
}
