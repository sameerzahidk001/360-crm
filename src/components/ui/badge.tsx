import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "purple";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-bg-main text-text-secondary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
  info: "bg-accent-orange/10 text-accent-orange",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { label: string; variant: BadgeVariant }> = {
    todo: { label: "To Do", variant: "default" },
    in_progress: { label: "In Progress", variant: "info" },
    in_review: { label: "In Review", variant: "purple" },
    completed: { label: "Completed", variant: "success" },
    on_hold: { label: "On Hold", variant: "warning" },
    active: { label: "Active", variant: "success" },
    planning: { label: "Planning", variant: "info" },
    pending: { label: "Pending", variant: "warning" },
    approved: { label: "Approved", variant: "success" },
    rejected: { label: "Rejected", variant: "danger" },
    present: { label: "Present", variant: "success" },
    absent: { label: "Absent", variant: "danger" },
    late: { label: "Late", variant: "warning" },
    leave: { label: "On Leave", variant: "info" },
    work_from_home: { label: "WFH", variant: "purple" },
    submitted: { label: "Submitted", variant: "info" },
    reviewed: { label: "Reviewed", variant: "success" },
    needs_update: { label: "Needs Update", variant: "warning" },
    cancelled: { label: "Cancelled", variant: "danger" },
    inactive: { label: "Inactive", variant: "default" },
  };

  const config = statusMap[status] || { label: status, variant: "default" as BadgeVariant };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const priorityMap: Record<string, { label: string; variant: BadgeVariant }> = {
    low: { label: "Low", variant: "default" },
    normal: { label: "Normal", variant: "info" },
    high: { label: "High", variant: "warning" },
    urgent: { label: "Urgent", variant: "danger" },
  };

  const config = priorityMap[priority] || { label: priority, variant: "default" as BadgeVariant };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
