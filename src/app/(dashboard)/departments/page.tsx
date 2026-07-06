"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input, Textarea } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";

export default function DepartmentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [headName, setHeadName] = useState("");
  const departments = useCrmDataStore((s) => s.departments);
  const addDepartment = useCrmDataStore((s) => s.addDepartment);
  const addToast = useAppStore((s) => s.addToast);

  const handleAdd = () => {
    if (!name.trim()) {
      addToast({ title: "Department name is required", type: "warning" });
      return;
    }
    addDepartment({
      name: name.trim(),
      description: description.trim() || undefined,
      headName: headName.trim() || undefined,
      employeeCount: 0,
      teamCount: 0,
      projectCount: 0,
    });
    addToast({ title: "Department added", message: name.trim(), type: "success" });
    setName("");
    setDescription("");
    setHeadName("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Departments"
        description="Manage company departments"
        actions={
          <Button type="button" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Add Department
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="p-5 hover:shadow-md transition-all">
            <h3 className="font-semibold text-lg">{dept.name}</h3>
            {dept.description && <p className="text-sm text-text-secondary mt-1">{dept.description}</p>}
            {dept.headName && (
              <div className="flex items-center gap-2 mt-4">
                <Avatar name={dept.headName} size="sm" />
                <div>
                  <p className="text-sm font-medium">{dept.headName}</p>
                  <p className="text-xs text-text-secondary">Department Head</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
              <div className="text-center"><p className="text-lg font-bold text-accent-orange">{dept.employeeCount}</p><p className="text-[10px] text-text-secondary">Employees</p></div>
              <div className="text-center"><p className="text-lg font-bold text-accent-orange">{dept.teamCount}</p><p className="text-[10px] text-text-secondary">Teams</p></div>
              <div className="text-center"><p className="text-lg font-bold text-success">{dept.projectCount}</p><p className="text-[10px] text-text-secondary">Projects</p></div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Department"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleAdd}>Add Department</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Department Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Quality Assurance" required />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Department description..." />
          <Input label="Department Head" value={headName} onChange={(e) => setHeadName(e.target.value)} placeholder="Head name (optional)" />
        </div>
      </Modal>
    </div>
  );
}
