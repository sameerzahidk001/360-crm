"use client";

import {
  FolderKanban, CheckSquare, AlertTriangle, Users, Clock,
  ArrowRight, Megaphone,
} from "lucide-react";
import Link from "next/link";
import { KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskCard } from "@/components/tasks/task-card";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  TaskCompletionChart, ProjectProgressChart, TeamWorkloadChart, AttendanceChart,
} from "@/components/charts/dashboard-charts";
import { getGreeting, formatRelative } from "@/lib/utils";
import {
  dashboardKPIs, chartData, activities, announcements,
  attendanceRecords, leaveRequests,
} from "@/data/mock";
import { useTaskStore } from "@/store/task-store";
import { useAppStore } from "@/store/app-store";

export function CompanyAdminDashboard() {
  const tasks = useTaskStore((s) => s.tasks);
  const user = useAppStore((s) => s.user);
  const myTasks = tasks.filter((t) => t.status !== "completed").slice(0, 4);
  const pendingApprovals = leaveRequests.filter((l) => l.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            {getGreeting()}, {user.name.split(" ")[0]}
          </h1>
          <p className="text-text-secondary mt-1">Company overview — projects, people, and performance.</p>
        </div>
        <select className="h-9 px-3 rounded-xl border border-border bg-surface text-sm">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>This month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Active Projects" value={dashboardKPIs.activeProjects} change="+2 this month" changeType="positive" icon={<FolderKanban className="h-5 w-5" />} accent />
        <KPICard title="Tasks In Progress" value={dashboardKPIs.tasksInProgress} icon={<CheckSquare className="h-5 w-5" />} />
        <KPICard title="Overdue Tasks" value={dashboardKPIs.overdueTasks} changeType="negative" icon={<AlertTriangle className="h-5 w-5" />} />
        <KPICard title="Team Members" value={dashboardKPIs.activeEmployees} change={`${dashboardKPIs.presentToday} present`} changeType="positive" icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Task Overview</CardTitle></CardHeader>
          <CardContent><TaskCompletionChart data={chartData.taskCompletion} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Today&apos;s Attendance</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 rounded-xl bg-success/10">
                <p className="text-2xl font-bold text-success">{dashboardKPIs.presentToday}</p>
                <p className="text-xs text-text-secondary">Present</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-danger/10">
                <p className="text-2xl font-bold text-danger">{dashboardKPIs.absentToday}</p>
                <p className="text-xs text-text-secondary">Absent</p>
              </div>
            </div>
            <AttendanceChart data={chartData.attendance} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardHeader><CardTitle>Project Progress</CardTitle></CardHeader><CardContent><ProjectProgressChart data={chartData.projectProgress} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Team Workload</CardTitle></CardHeader><CardContent><TeamWorkloadChart data={chartData.teamWorkload} /></CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Tasks</CardTitle>
            <Link href="/tasks"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">{myTasks.map((t) => <TaskCard key={t.id} task={t} compact />)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Approvals</CardTitle>
            <Link href="/leave"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-3 rounded-xl border border-border">
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Link href="/activity"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <Avatar name={a.userName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm"><span className="font-medium">{a.userName}</span> <span className="text-text-secondary">{a.action}</span></p>
                  <p className="text-[10px] text-text-secondary/60">{formatRelative(a.timestamp)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Attendance</CardTitle>
            <Link href="/attendance"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {attendanceRecords.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2"><Avatar name={r.employeeName} size="sm" /><span className="text-sm">{r.employeeName}</span></div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-3 rounded-xl bg-bg-main">
                <div className="flex items-center gap-2 mb-1"><Megaphone className="h-3.5 w-3.5 text-brand-blue" /><p className="text-sm font-medium">{ann.title}</p></div>
                <p className="text-xs text-text-secondary line-clamp-2">{ann.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
