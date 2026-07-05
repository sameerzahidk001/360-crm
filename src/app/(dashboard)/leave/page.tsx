"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { leaveRequests } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import type { LeaveRequest } from "@/types";

export default function LeavePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { key: "employeeName", header: "Employee" },
    { key: "leaveType", header: "Type", render: (l: LeaveRequest) => <span className="capitalize">{l.leaveType.replace("_", " ")}</span> },
    { key: "startDate", header: "From", render: (l: LeaveRequest) => formatDate(l.startDate) },
    { key: "endDate", header: "To", render: (l: LeaveRequest) => formatDate(l.endDate) },
    { key: "reason", header: "Reason", className: "max-w-[200px]" },
    { key: "status", header: "Status", render: (l: LeaveRequest) => <StatusBadge status={l.status} /> },
    {
      key: "actions",
      header: "Actions",
      render: (l: LeaveRequest) => l.status === "pending" ? (
        <div className="flex gap-1">
          <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
          <Button size="sm" className="h-7 text-xs">Approve</Button>
        </div>
      ) : null,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Leave Requests" description="Manage employee leave requests" actions={<Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Request Leave</Button>} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: "Annual Leave", balance: "12 days" }, { label: "Sick Leave", balance: "8 days" }, { label: "Casual Leave", balance: "5 days" }, { label: "Used This Year", balance: "7 days" }].map((b) => (
          <div key={b.label} className="p-4 rounded-2xl border border-border bg-surface text-center">
            <p className="text-lg font-bold text-brand-blue">{b.balance}</p>
            <p className="text-xs text-text-secondary">{b.label}</p>
          </div>
        ))}
      </div>
      <DataTable data={leaveRequests} columns={columns} searchKey="employeeName" />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Request Leave" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Submit Request</Button></>}>
        <div className="space-y-4">
          <Select label="Leave Type" options={[{ value: "annual", label: "Annual Leave" }, { value: "sick", label: "Sick Leave" }, { value: "casual", label: "Casual Leave" }, { value: "emergency", label: "Emergency Leave" }]} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" />
            <Input label="End Date" type="date" />
          </div>
          <Textarea label="Reason" placeholder="Reason for leave..." />
        </div>
      </Modal>
    </div>
  );
}
