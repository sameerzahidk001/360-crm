"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";

export default function CompaniesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("Starter");
  const platformCompanies = useCrmDataStore((s) => s.platformCompanies);
  const addCompany = useCrmDataStore((s) => s.addCompany);
  const addToast = useAppStore((s) => s.addToast);

  const columns = [
    { key: "name", header: "Company", render: (c: typeof platformCompanies[0]) => <span className="font-medium">{c.name}</span> },
    { key: "plan", header: "Plan" },
    { key: "users", header: "Users" },
    { key: "workspaces", header: "Workspaces" },
    { key: "status", header: "Status", render: (c: typeof platformCompanies[0]) => <StatusBadge status={c.status === "trial" ? "on_hold" : c.status === "inactive" ? "cancelled" : "active"} /> },
    { key: "createdAt", header: "Joined" },
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
    addToast({ title: "Company added", message: name.trim(), type: "success" });
    setName("");
    setPlan("Starter");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Companies"
        description="Manage all registered companies"
        actions={
          <Button type="button" size="sm" onClick={() => setModalOpen(true)}>Add Company</Button>
        }
      />
      <DataTable data={platformCompanies} columns={columns} searchKey="name" searchPlaceholder="Search companies..." />

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
          <Input label="Company Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Company name" required />
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
