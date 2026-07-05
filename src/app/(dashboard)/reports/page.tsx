"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TaskCompletionChart, ProjectProgressChart, AttendanceChart } from "@/components/charts/dashboard-charts";
import { chartData } from "@/data/mock";
import { Download, FileSpreadsheet, FileText } from "lucide-react";

const reportTypes = [
  { title: "Task Report", description: "Task completion and status analytics" },
  { title: "Project Report", description: "Project progress and timeline" },
  { title: "Employee Performance", description: "Individual performance metrics" },
  { title: "Team Performance", description: "Team workload and output" },
  { title: "Attendance Report", description: "Daily and monthly attendance" },
  { title: "Leave Report", description: "Leave usage and balances" },
  { title: "Daily Work Report", description: "Employee daily submissions" },
  { title: "Time Tracking Report", description: "Hours logged per task/project" },
  { title: "Client Project Report", description: "Client-wise project status" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Generate and export company reports" />
      <Card className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div><label className="text-xs font-medium text-text-secondary">Date Range</label><select className="w-full h-9 mt-1 px-3 rounded-xl border border-border bg-surface text-sm"><option>Last 30 days</option><option>Last 90 days</option><option>This year</option></select></div>
          <div><label className="text-xs font-medium text-text-secondary">Department</label><select className="w-full h-9 mt-1 px-3 rounded-xl border border-border bg-surface text-sm"><option>All Departments</option></select></div>
          <div><label className="text-xs font-medium text-text-secondary">Project</label><select className="w-full h-9 mt-1 px-3 rounded-xl border border-border bg-surface text-sm"><option>All Projects</option></select></div>
          <div><label className="text-xs font-medium text-text-secondary">Employee</label><select className="w-full h-9 mt-1 px-3 rounded-xl border border-border bg-surface text-sm"><option>All Employees</option></select></div>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card><CardHeader><CardTitle>Task Activity</CardTitle></CardHeader><CardContent><TaskCompletionChart data={chartData.taskCompletion} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Project Progress</CardTitle></CardHeader><CardContent><ProjectProgressChart data={chartData.projectProgress} /></CardContent></Card>
      </div>
      <Card><CardHeader><CardTitle>Attendance Trends</CardTitle></CardHeader><CardContent><AttendanceChart data={chartData.attendance} /></CardContent></Card>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {reportTypes.map((report) => (
          <Card key={report.title} className="p-5 hover:shadow-md transition-all">
            <h3 className="font-semibold">{report.title}</h3>
            <p className="text-sm text-text-secondary mt-1">{report.description}</p>
            <div className="flex gap-2 mt-4">
              <Button size="sm" variant="outline"><FileText className="h-3.5 w-3.5" /> PDF</Button>
              <Button size="sm" variant="outline"><FileSpreadsheet className="h-3.5 w-3.5" /> Excel</Button>
              <Button size="sm" variant="outline"><Download className="h-3.5 w-3.5" /> CSV</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
