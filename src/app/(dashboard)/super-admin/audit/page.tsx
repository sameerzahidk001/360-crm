"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { DataTable } from "@/components/ui/data-table";
import { auditLogs, loginHistory } from "@/data/mock";
import { formatRelative } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AuditLogsPage() {
  const columns = [
    { key: "user", header: "User", render: (l: typeof auditLogs[0]) => <span className="font-medium">{l.user}</span> },
    { key: "action", header: "Action" },
    { key: "target", header: "Target" },
    { key: "ip", header: "IP Address" },
    { key: "timestamp", header: "Time", render: (l: typeof auditLogs[0]) => formatRelative(l.timestamp) },
  ];

  const loginColumns = [
    { key: "user", header: "User" },
    { key: "device", header: "Device" },
    { key: "location", header: "Location" },
    { key: "status", header: "Status", render: (l: typeof loginHistory[0]) => <StatusBadge status={l.status === "success" ? "completed" : "cancelled"} /> },
    { key: "timestamp", header: "Time", render: (l: typeof loginHistory[0]) => formatRelative(l.timestamp) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description="Platform activity and login history" />
      <Card>
        <CardHeader><CardTitle>Activity Logs</CardTitle></CardHeader>
        <CardContent><DataTable data={auditLogs} columns={columns} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Login History</CardTitle></CardHeader>
        <CardContent><DataTable data={loginHistory} columns={loginColumns} /></CardContent>
      </Card>
    </div>
  );
}
