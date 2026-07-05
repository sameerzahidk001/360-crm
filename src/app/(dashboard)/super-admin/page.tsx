"use client";

import { Building2, Users, Layers, Activity } from "lucide-react";
import Link from "next/link";
import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { platformCompanies, auditLogs, subscriptionPlans } from "@/data/mock";
import { formatRelative } from "@/lib/utils";
import { TaskCompletionChart } from "@/components/charts/dashboard-charts";
import { chartData } from "@/data/mock";

export default function SuperAdminDashboardPage() {
  const companyColumns = [
    { key: "name", header: "Company", render: (c: typeof platformCompanies[0]) => <span className="font-medium">{c.name}</span> },
    { key: "plan", header: "Plan", render: (c: typeof platformCompanies[0]) => <span className="capitalize">{c.plan}</span> },
    { key: "users", header: "Users" },
    { key: "workspaces", header: "Workspaces" },
    { key: "status", header: "Status", render: (c: typeof platformCompanies[0]) => <StatusBadge status={c.status === "trial" ? "on_hold" : c.status === "inactive" ? "cancelled" : "active"} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Dashboard"
        description="Platform overview and usage statistics"
        actions={<Button size="sm" className="gradient-sidebar-active border-0">Add Company</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Total Companies" value={platformCompanies.length} change="+2 this month" changeType="positive" icon={<Building2 className="h-5 w-5" />} accent />
        <KPICard title="Total Users" value={171} change="Across all companies" changeType="neutral" icon={<Users className="h-5 w-5" />} />
        <KPICard title="Active Workspaces" value={86} icon={<Layers className="h-5 w-5" />} />
        <KPICard title="Platform Activity" value="2.4k" change="+12% vs last week" changeType="positive" icon={<Activity className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Platform Growth</CardTitle></CardHeader>
          <CardContent><TaskCompletionChart data={chartData.taskCompletion} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Subscription Plans</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="p-3 rounded-xl bg-bg-main flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{plan.name}</p>
                  <p className="text-xs text-text-secondary">{plan.companies} companies</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-blue">${plan.price}</p>
                  <p className="text-[10px] text-text-secondary">/month</p>
                </div>
              </div>
            ))}
            <Link href="/super-admin/subscriptions"><Button variant="outline" size="sm" className="w-full">Manage Plans</Button></Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Companies</CardTitle>
          <Link href="/super-admin/companies"><Button variant="ghost" size="sm">View all</Button></Link>
        </CardHeader>
        <CardContent>
          <DataTable data={platformCompanies} columns={companyColumns} searchKey="name" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent Audit Logs</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm"><span className="font-medium">{log.user}</span> <span className="text-text-secondary">{log.action}</span> <span className="font-medium">{log.target}</span></p>
                <p className="text-xs text-text-secondary">{log.ip}</p>
              </div>
              <span className="text-xs text-text-secondary">{formatRelative(log.timestamp)}</span>
            </div>
          ))}
          <Link href="/super-admin/audit"><Button variant="outline" size="sm">View all logs</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
