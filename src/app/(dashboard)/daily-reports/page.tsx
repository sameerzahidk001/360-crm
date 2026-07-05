"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { dailyReports } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import type { DailyReport } from "@/types";

export default function DailyReportsPage() {
  const columns = [
    { key: "employeeName", header: "Employee" },
    { key: "date", header: "Date", render: (r: DailyReport) => formatDate(r.date) },
    { key: "tasksWorkedOn", header: "Tasks", className: "max-w-[200px]" },
    { key: "totalHours", header: "Hours", render: (r: DailyReport) => `${r.totalHours}h` },
    { key: "status", header: "Status", render: (r: DailyReport) => <StatusBadge status={r.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (r: DailyReport) => r.status === "submitted" ? (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" className="h-7 text-xs">Request Update</Button>
          <Button size="sm" className="h-7 text-xs">Mark Reviewed</Button>
        </div>
      ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Daily Reports" description="Review employee daily work reports" actions={<Link href="/daily-reports/submit"><Button size="sm"><Plus className="h-4 w-4" /> Submit Report</Button></Link>} />
      <DataTable data={dailyReports} columns={columns} searchKey="employeeName" />
    </div>
  );
}
