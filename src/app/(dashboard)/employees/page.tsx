"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { employees } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import type { Employee } from "@/types";

export default function EmployeesPage() {
  const columns = [
    {
      key: "name",
      header: "Employee",
      render: (e: Employee) => (
        <div className="flex items-center gap-3">
          <Avatar name={e.name} size="sm" />
          <div>
            <p className="font-medium">{e.name}</p>
            <p className="text-xs text-text-secondary">{e.email}</p>
          </div>
        </div>
      ),
    },
    { key: "employeeId", header: "ID" },
    { key: "departmentName", header: "Department" },
    { key: "designation", header: "Designation" },
    { key: "teamName", header: "Team" },
    {
      key: "status",
      header: "Status",
      render: (e: Employee) => <StatusBadge status={e.status} />,
    },
    {
      key: "joiningDate",
      header: "Joined",
      render: (e: Employee) => formatDate(e.joiningDate),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Manage company employees and their profiles"
        actions={
          <Link href="/employees/add">
            <Button size="sm"><Plus className="h-4 w-4" /> Add Employee</Button>
          </Link>
        }
      />
      <DataTable
        data={employees}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search employees..."
        onRowClick={(e) => window.location.href = `/employees/${e.id}`}
      />
    </div>
  );
}
