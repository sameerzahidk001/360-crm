"use client";

import { CheckSquare, Clock, AlertTriangle, Trophy } from "lucide-react";
import { KPICard } from "@/components/ui/kpi-card";
import { TaskCard } from "@/components/tasks/task-card";
import { PageHeader } from "@/components/ui/kpi-card";
import { useTaskStore } from "@/store/task-store";
import { useAppStore } from "@/store/app-store";
import { isOverdue } from "@/lib/utils";
import { format } from "date-fns";

export default function MyWorkPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const today = format(new Date(), "yyyy-MM-dd");
  const todayTasks = tasks.filter((t) => t.dueDate === today || t.status === "in_progress");
  const upcomingTasks = tasks.filter((t) => t.dueDate > today && t.status !== "completed");
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate) && t.status !== "completed");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const inReview = tasks.filter((t) => t.status === "in_review");
  const completed = tasks.filter((t) => t.status === "completed");

  const sections = [
    { title: "Today", tasks: todayTasks.length > 0 ? todayTasks : tasks.filter((t) => t.status === "in_progress").slice(0, 3) },
    { title: "Upcoming", tasks: upcomingTasks },
    { title: "Overdue", tasks: overdueTasks },
    { title: "In Progress", tasks: inProgress },
    { title: "In Review", tasks: inReview },
    { title: "Completed", tasks: completed },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Work"
        description="Your tasks and work items at a glance"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Tasks Today" value={todayTasks.length || inProgress.length} icon={<CheckSquare className="h-5 w-5" />} accent />
        <KPICard title="In Progress" value={inProgress.length} icon={<Clock className="h-5 w-5" />} />
        <KPICard title="Overdue" value={overdueTasks.length} changeType="negative" icon={<AlertTriangle className="h-5 w-5" />} />
        <KPICard title="Completed This Week" value={completed.length} changeType="positive" icon={<Trophy className="h-5 w-5" />} />
      </div>

      {sections.map((section) => (
        section.tasks.length > 0 && (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-text-primary mb-3 flex items-center gap-2">
              {section.title}
              <span className="text-xs font-normal text-text-secondary bg-bg-main px-2 py-0.5 rounded-full">
                {section.tasks.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {section.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}
