"use client";

import { FolderKanban, CheckSquare, AlertTriangle, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskCard } from "@/components/tasks/task-card";
import { Button } from "@/components/ui/button";
import { TeamWorkloadChart, ProjectProgressChart } from "@/components/charts/dashboard-charts";
import { useTaskStore } from "@/store/task-store";
import { dashboardKPIs, chartData, leaveRequests, teams } from "@/data/mock";
import { getGreeting, isOverdue } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

export function ManagerDashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const user = useAppStore((s) => s.user);
  const overdueTasks = tasks.filter((t) => isOverdue(t.dueDate) && t.status !== "completed");
  const pendingApprovals = leaveRequests.filter((l) => l.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{getGreeting()}, {user.name.split(" ")[0]}</h1>
        <p className="text-text-secondary mt-1">Team overview — projects, workload, and what needs your attention.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Active Projects" value={dashboardKPIs.activeProjects} icon={<FolderKanban className="h-5 w-5" />} accent />
        <KPICard title="Tasks In Progress" value={dashboardKPIs.tasksInProgress} icon={<CheckSquare className="h-5 w-5" />} />
        <KPICard title="Overdue Tasks" value={overdueTasks.length} changeType="negative" icon={<AlertTriangle className="h-5 w-5" />} />
        <KPICard title="Team Members" value={teams.reduce((a, t) => a + t.memberCount, 0)} icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Team Workload</CardTitle></CardHeader>
          <CardContent><TeamWorkloadChart data={chartData.teamWorkload} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Project Progress</CardTitle></CardHeader>
          <CardContent><ProjectProgressChart data={chartData.projectProgress} /></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Overdue Tasks</CardTitle>
            <Link href="/tasks"><Button variant="ghost" size="sm">Board <ArrowRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {overdueTasks.slice(0, 4).map((task) => (
              <TaskCard key={task.id} task={task} compact />
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Approvals</CardTitle>
            <Link href="/leave"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-main">
                <div>
                  <p className="text-sm font-medium">{leave.employeeName}</p>
                  <p className="text-xs text-text-secondary capitalize">{leave.leaveType.replace("_", " ")}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="text-xs h-7">Reject</Button>
                  <Button size="sm" className="text-xs h-7">Approve</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
