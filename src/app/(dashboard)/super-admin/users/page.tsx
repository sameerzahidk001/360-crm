"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { employees, demoUsers } from "@/data/mock";
import { ROLE_LABELS } from "@/lib/constants";

const allUsers = [
  { ...demoUsers.super_admin, department: "Platform", status: "active" },
  { ...demoUsers.company_admin, department: "Management", status: "active" },
  ...employees.map((e) => ({ id: e.id, name: e.name, email: e.email, role: "employee" as const, department: e.departmentName, status: e.status })),
];

export default function SuperAdminUsersPage() {
  const columns = [
    { key: "name", header: "Name", render: (u: typeof allUsers[0]) => <span className="font-medium">{u.name}</span> },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", render: (u: typeof allUsers[0]) => ROLE_LABELS[u.role] || u.role },
    { key: "department", header: "Department" },
    { key: "status", header: "Status", render: (u: typeof allUsers[0]) => <StatusBadge status={u.status === "active" ? "active" : "inactive"} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage all platform users" />
      <DataTable data={allUsers} columns={columns} searchKey="name" searchPlaceholder="Search users..." />
    </div>
  );
}
