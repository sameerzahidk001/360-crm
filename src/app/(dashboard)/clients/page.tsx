"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { clients } from "@/data/mock";
import type { Client } from "@/types";

export default function ClientsPage() {
  const columns = [
    { key: "companyName", header: "Company", render: (c: Client) => <div><p className="font-medium">{c.companyName}</p><p className="text-xs text-text-secondary">{c.name}</p></div> },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "country", header: "Country" },
    { key: "accountManagerName", header: "Account Manager" },
    { key: "projectCount", header: "Projects" },
    { key: "status", header: "Status", render: (c: Client) => <StatusBadge status={c.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Clients" description="Manage client relationships" actions={<Link href="/clients/add"><Button size="sm"><Plus className="h-4 w-4" /> Add Client</Button></Link>} />
      <DataTable data={clients} columns={columns} searchKey="companyName" searchPlaceholder="Search clients..." onRowClick={(c) => window.location.href = `/clients/${c.id}`} />
    </div>
  );
}
