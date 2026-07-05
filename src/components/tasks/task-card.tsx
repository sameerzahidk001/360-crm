"use client";

import { useAppStore } from "@/store/app-store";
import { StatusBadge, PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatDate, isOverdue, cn } from "@/lib/utils";
import type { Task } from "@/types";
import { Calendar, MessageSquare } from "lucide-react";

interface TaskCardProps {
  task: Task;
  compact?: boolean;
}

export function TaskCard({ task, compact }: TaskCardProps) {
  const setSelectedTask = useAppStore((s) => s.setSelectedTask);
  const overdue = isOverdue(task.dueDate) && task.status !== "completed";

  return (
    <button
      onClick={() => setSelectedTask(task)}
      className={cn(
        "w-full text-left rounded-xl border border-border bg-surface p-4 hover:shadow-md transition-all duration-200",
        overdue && "border-danger/30",
        compact && "p-3"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-text-primary line-clamp-2">{task.title}</h4>
        <PriorityBadge priority={task.priority} />
      </div>
      <p className="text-xs text-text-secondary mt-1">{task.projectName}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          {task.assigneeNames[0] && <Avatar name={task.assigneeNames[0]} size="sm" />}
          <StatusBadge status={task.status} />
        </div>
        <div className={cn("flex items-center gap-1 text-xs", overdue ? "text-danger" : "text-text-secondary")}>
          <Calendar className="h-3 w-3" />
          {formatDate(task.dueDate, "MMM d")}
        </div>
      </div>
      {(task.commentCount ?? 0) > 0 && (
        <div className="flex items-center gap-1 mt-2 text-xs text-text-secondary">
          <MessageSquare className="h-3 w-3" />
          {task.commentCount}
        </div>
      )}
    </button>
  );
}
