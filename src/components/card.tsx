import { cn } from "@/utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg shadow-xl text-gray-700 border border-gray-400/30 bg-white dark:bg-gray-900 dark:text-gray-400 min-w-56 dynamic-last-child-round relative after:absolute after:-inset-px after:mask-image-gradient-to-br after:from-black after:to-transparent after:border dark:after:border-gray-100/15 after:border-gray-500/20 after:to-50% after:pointer-events-none dark:after:bg-gray-400/5 after:bg-gray-100/20 after:rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
