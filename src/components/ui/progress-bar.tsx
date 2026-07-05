import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function ProgressBar({ value, className, showLabel = false, size = "md" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const color =
    clamped >= 75 ? "bg-success" : clamped >= 40 ? "bg-accent-orange" : clamped >= 20 ? "bg-warning" : "bg-danger";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex-1 rounded-full bg-bg-main overflow-hidden",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-text-secondary w-8 text-right">{clamped}%</span>
      )}
    </div>
  );
}
