import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-accent-orange text-white hover:bg-[#D96E15] shadow-sm shadow-accent-orange/30",
    secondary: "bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20",
    outline: "border border-border bg-surface text-text-primary hover:bg-bg-main",
    ghost: "text-text-secondary hover:bg-bg-main hover:text-text-primary",
    danger: "bg-danger text-white hover:bg-danger/90",
  };

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-lg",
    md: "h-10 px-4 text-sm rounded-xl",
    lg: "h-12 px-6 text-base rounded-xl",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
