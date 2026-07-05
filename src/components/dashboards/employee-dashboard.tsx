"use client";

import { CheckSquare, Clock, AlertTriangle, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskCard } from "@/components/tasks/task-card";
import { Button } from "@/components/ui/button";
import { useTaskStore } from "@/store/task-store";
import { announcements } from "@/data/mock";
import { getGreeting, isOverdue } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { format } from "date-fns";
import { useTimerStore } from "@/store/timer-store";
import { formatDuration } from "@/store/timer-store";

export function EmployeeDashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const user = useAppStore((s) => s.user);
  const userName = user.name.split(" ")[0];
  const today = format(new Date(), "yyyy-MM-dd");
  const myTasks = tasks.filter((t) => t.assigneeIds.includes(user.id));
  const todayTasks = myTasks.filter((t) => t.dueDate === today || t.status === "in_progress");
  const overdueTasks = myTasks.filter((t) => isOverdue(t.dueDate) && t.status !== "completed");
  const inProgress = myTasks.filter((t) => t.status === "in_progress");
  const completed = myTasks.filter((t) => t.status === "completed");
  const elapsed = useTimerStore((s) => s.getElapsedMs());
  const isRunning = useTimerStore((s) => s.isRunning);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{getGreeting()}, {userName}</h1>
        <p className="text-text-secondary mt-1">Here&apos;s your work for today — keep it simple, stay focused.</p>
      </div>

      {isRunning && (
        <div className="rounded-2xl bg-black p-4 text-white flex items-center justify-between border border-accent-orange/30">
          <div>
            <p className="text-sm text-accent-orange">Timer running</p>
            <p className="text-3xl font-mono font-bold">{formatDuration(elapsed)}</p>
          </div>
          <Link href="/time-tracking"><Button variant="secondary" size="sm">Open Timer</Button></Link>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Tasks Today" value={todayTasks.length} icon={<CheckSquare className="h-5 w-5" />} accent />
        <KPICard title="In Progress" value={inProgress.length} icon={<Clock className="h-5 w-5" />} />
        <KPICard title="Overdue" value={overdueTasks.length} changeType="negative" icon={<AlertTriangle className="h-5 w-5" />} />
        <KPICard title="Completed" value={completed.length} changeType="positive" icon={<Trophy className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today&apos;s Tasks</CardTitle>
            <Link href="/my-work"><Button variant="ghost" size="sm">My Work <ArrowRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(todayTasks.length ? todayTasks : inProgress).slice(0, 4).map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Submit Daily Report", href: "/daily-reports/submit" },
              { label: "Check Attendance", href: "/attendance" },
              { label: "Request Leave", href: "/leave" },
              { label: "Start Timer", href: "/time-tracking" },
            ].map((a) => (
              <Link key={a.href} href={a.href} className="block p-3 rounded-xl bg-bg-main hover:bg-brand-blue/5 text-sm font-medium transition-colors">
                {a.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {announcements.slice(0, 2).map((a) => (
            <div key={a.id} className="p-3 rounded-xl bg-bg-main">
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-text-secondary mt-1 line-clamp-2">{a.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
