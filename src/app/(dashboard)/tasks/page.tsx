"use client";

import { useState } from "react";
import { Plus, LayoutGrid, List, Calendar } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge, PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { useAppStore } from "@/store/app-store";
import { useTaskStore } from "@/store/task-store";
import { formatDate } from "@/lib/utils";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";

export default function TasksPage() {
  const [view, setView] = useState<"list" | "board" | "calendar">("board");
  const tasks = useTaskStore((s) => s.tasks);
  const openCreateModal = useAppStore((s) => s.openCreateModal);
  const setSelectedTask = useAppStore((s) => s.setSelectedTask);

  const columns = [
    {
      key: "title",
      header: "Task",
      render: (t: Task) => (
        <div>
          <p className="font-medium text-text-primary">{t.title}</p>
          <p className="text-xs text-text-secondary">{t.projectName}</p>
        </div>
      ),
    },
    {
      key: "assignee",
      header: "Assignee",
      render: (t: Task) => (
        <div className="flex items-center gap-2">
          {t.assigneeNames[0] && <Avatar name={t.assigneeNames[0]} size="sm" />}
          <span className="text-sm">{t.assigneeNames[0]}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (t: Task) => <StatusBadge status={t.status} />,
    },
    {
      key: "priority",
      header: "Priority",
      render: (t: Task) => <PriorityBadge priority={t.priority} />,
    },
    {
      key: "dueDate",
      header: "Due Date",
      render: (t: Task) => <span className="text-sm">{formatDate(t.dueDate)}</span>,
    },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Tasks"
        description="Manage and track all tasks across projects"
        compact
        actions={
          <Button size="sm" onClick={() => openCreateModal("task")}>
            <Plus className="h-4 w-4" /> New Task
          </Button>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-surface border border-border rounded-xl p-1">
          {[
            { id: "list" as const, icon: List, label: "List" },
            { id: "board" as const, icon: LayoutGrid, label: "Board" },
            { id: "calendar" as const, icon: Calendar, label: "Calendar" },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setView(v.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                view === v.id ? "bg-accent-orange text-white" : "text-text-secondary hover:text-text-primary"
              )}
            >
              <v.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{v.label}</span>
            </button>
          ))}
        </div>
        {view === "calendar" && (
          <Link href="/calendar"><Button variant="outline" size="sm">Full Calendar</Button></Link>
        )}
      </div>

      {view === "list" && (
        <DataTable data={tasks} columns={columns} searchKey="title" searchPlaceholder="Search tasks..." onRowClick={setSelectedTask} />
      )}
      {view === "board" && <KanbanBoard />}
      {view === "calendar" && (
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }, (_, i) => {
            const day = i + 1;
            const dayTasks = tasks.filter((t) => t.dueDate.endsWith(String(day).padStart(2, "0")));
            return (
              <div key={i} className={cn("min-h-[100px] p-2 rounded-xl border border-border bg-surface", day > 31 && "opacity-30")}>
                {day <= 31 && (
                  <>
                    <p className="text-xs font-medium text-text-secondary mb-1">{day}</p>
                    {dayTasks.map((t) => (
                      <button key={t.id} onClick={() => setSelectedTask(t)} className="w-full text-left p-1 mb-1 rounded bg-brand-blue/10 text-[10px] truncate">
                        {t.title}
                      </button>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
