"use client";

import { useState } from "react";
import { Building2, Users, Layers, Activity } from "lucide-react";
import Link from "next/link";
import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";
import { auditLogs, subscriptionPlans } from "@/data/mock";
import { formatRelative } from "@/lib/utils";
import { TaskCompletionChart } from "@/components/charts/dashboard-charts";
import { chartData } from "@/data/mock";

export default function SuperAdminDashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("Starter");
  const platformCompanies = useCrmDataStore((s) => s.platformCompanies);
  const addCompany = useCrmDataStore((s) => s.addCompany);
  const addToast = useAppStore((s) => s.addToast);

  const companyColumns = [
    { key: "name", header: "Company", render: (c: typeof platformCompanies[0]) => <span className="font-medium">{c.name}</span> },
    { key: "plan", header: "Plan", render: (c: typeof platformCompanies[0]) => <span className="capitalize">{c.plan}</span> },
    { key: "users", header: "Users" },
    { key: "workspaces", header: "Workspaces" },
    { key: "status", header: "Status", render: (c: typeof platformCompanies[0]) => <StatusBadge status={c.status === "trial" ? "on_hold" : c.status === "inactive" ? "cancelled" : "active"} /> },
  ];

  const handleAdd = () => {
    if (!name.trim()) {
      addToast({ title: "Company name is required", type: "warning" });
      return;
    }
    addCompany({
      name: name.trim(),
      plan,
      users: 0,
      workspaces: 1,
      status: "trial",
      createdAt: new Date().toISOString().split("T")[0],
    });
    addToast({ title: "Company added", type: "success" });
    setName("");
    setPlan("Starter");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Dashboard"
        description="Platform overview and usage statistics"
        actions={
          <Button type="button" size="sm" onClick={() => setModalOpen(true)}>Add Company</Button>
        }
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
            {subscriptionPlans.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-bg-main flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-text-secondary">{p.companies} companies</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent-orange">${p.price}</p>
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Company"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleAdd}>Add Company</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Company Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Select
            label="Plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            options={[
              { value: "Starter", label: "Starter" },
              { value: "Professional", label: "Professional" },
              { value: "Enterprise", label: "Enterprise" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
