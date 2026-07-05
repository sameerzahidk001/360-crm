"use client";

import { Users, Clock, Palmtree, UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AttendanceChart } from "@/components/charts/dashboard-charts";
import {
  dashboardKPIs, chartData, leaveRequests, attendanceRecords, employees, announcements,
} from "@/data/mock";
import { getGreeting } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";

export function HRDashboard() {
  const user = useAppStore((s) => s.user);
  const pendingLeave = leaveRequests.filter((l) => l.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{getGreeting()}, {user.name.split(" ")[0]}</h1>
        <p className="text-text-secondary mt-1">HR overview — employees, attendance, and leave at a glance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Total Employees" value={dashboardKPIs.totalEmployees} icon={<Users className="h-5 w-5" />} accent />
        <KPICard title="Present Today" value={dashboardKPIs.presentToday} changeType="positive" icon={<Clock className="h-5 w-5" />} />
        <KPICard title="On Leave" value={leaveRequests.filter((l) => l.status === "approved").length} icon={<Palmtree className="h-5 w-5" />} />
        <KPICard title="Pending Leave" value={pendingLeave.length} changeType="negative" icon={<UserPlus className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Leave Requests</CardTitle>
            <Link href="/leave"><Button variant="ghost" size="sm">Manage <ArrowRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingLeave.map((leave) => (
              <div key={leave.id} className="flex items-center justify-between p-3 rounded-xl border border-border">
                <div>
                  <p className="text-sm font-medium">{leave.employeeName}</p>
                  <p className="text-xs text-text-secondary capitalize">{leave.leaveType.replace("_", " ")} • {leave.startDate}</p>
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
          <CardHeader><CardTitle>Weekly Attendance</CardTitle></CardHeader>
          <CardContent><AttendanceChart data={chartData.attendance} /></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Today&apos;s Attendance</CardTitle>
            <Link href="/attendance"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {attendanceRecords.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Avatar name={r.employeeName} size="sm" />
                  <span className="text-sm">{r.employeeName}</span>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Recent Employees</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {employees.slice(0, 5).map((e) => (
              <Link key={e.id} href={`/employees/${e.id}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-bg-main">
                <div className="flex items-center gap-2">
                  <Avatar name={e.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{e.name}</p>
                    <p className="text-xs text-text-secondary">{e.designation}</p>
                  </div>
                </div>
                <StatusBadge status={e.status === "active" ? "active" : "on_hold"} />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>HR Announcements</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {announcements.map((a) => (
            <div key={a.id} className="p-3 rounded-xl bg-bg-main">
              <p className="text-sm font-medium">{a.title}</p>
              <p className="text-xs text-text-secondary">{a.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
