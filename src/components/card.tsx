import { Card as ShadcnCard, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export function Card({
  children,
  className,
  themeBackground,
  themeText,
  themeBorder,
  themeShadow,
}: {
  children: React.ReactNode;
  className?: string;
  themeBackground?: string;
  themeText?: string;
  themeBorder?: string;
  themeShadow?: string;
}) {
  return (
    <ShadcnCard
      className={cn(
        "relative",
        themeBorder || "border-gray-400/30",
        themeShadow || "shadow-xl",
        themeBackground || "bg-white dark:bg-gray-900",
        themeText || "text-gray-700 dark:text-gray-400",
        "after:border-gray-500/20 dark:after:border-gray-100/15 after:bg-gray-100/20 dark:after:bg-gray-400/5 after:absolute after:-inset-px after:mask-image-gradient-to-br after:from-black/90 dark:after:from-black/50 after:to-transparent after:border after:to-50% after:pointer-events-none after:rounded-lg",
        className
      )}
    >
      <CardContent className="p-0">{children}</CardContent>
    </ShadcnCard>
  );
}
