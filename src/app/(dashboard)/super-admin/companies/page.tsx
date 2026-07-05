"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { platformCompanies } from "@/data/mock";

export default function CompaniesPage() {
  const columns = [
    { key: "name", header: "Company", render: (c: typeof platformCompanies[0]) => <span className="font-medium">{c.name}</span> },
    { key: "plan", header: "Plan" },
    { key: "users", header: "Users" },
    { key: "workspaces", header: "Workspaces" },
    { key: "status", header: "Status", render: (c: typeof platformCompanies[0]) => <StatusBadge status={c.status === "trial" ? "on_hold" : c.status === "inactive" ? "cancelled" : "active"} /> },
    { key: "createdAt", header: "Joined" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Companies" description="Manage all registered companies" actions={<Button size="sm">Add Company</Button>} />
      <DataTable data={platformCompanies} columns={columns} searchKey="name" searchPlaceholder="Search companies..." />
    </div>
  );
}
