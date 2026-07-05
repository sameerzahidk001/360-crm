"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { projects, employees, clients, departments } from "@/data/mock";

export function CreateTaskModal() {
  const { createModalOpen, createModalType, closeCreateModal, addToast } = useAppStore();
  const router = useRouter();

  if (!createModalOpen || !createModalType) return null;

  const titles: Record<string, string> = {
    task: "Create New Task",
    project: "Create New Project",
    employee: "Add Employee",
    client: "Add Client",
  };

  const handleCreate = () => {
    addToast({
      title: `${titles[createModalType].replace("Create New ", "").replace("Add ", "")} created`,
      message: "Changes saved successfully.",
      type: "success",
    });
    closeCreateModal();
    if (createModalType === "project") router.push("/projects");
    if (createModalType === "employee") router.push("/employees");
    if (createModalType === "client") router.push("/clients");
  };

  return (
    <Modal
      open={createModalOpen}
      onClose={closeCreateModal}
      title={titles[createModalType]}
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={closeCreateModal}>Cancel</Button>
          <Button onClick={handleCreate} className="gradient-sidebar-active border-0">
            {createModalType === "task" ? "Create Task" : createModalType === "project" ? "Create Project" : "Save"}
          </Button>
        </>
      }
    >
      {createModalType === "task" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Input label="Task Title" placeholder="Enter task title" /></div>
          <div className="md:col-span-2"><Textarea label="Description" placeholder="Describe the task..." /></div>
          <Select label="Project" options={[{ value: "", label: "Select project" }, ...projects.map((p) => ({ value: p.id, label: p.title }))]} />
          <Select label="Assignee" options={[{ value: "", label: "Select employee" }, ...employees.map((e) => ({ value: e.id, label: e.name }))]} />
          <Select label="Priority" options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" }]} />
          <Select label="Status" options={[{ value: "todo", label: "To Do" }, { value: "in_progress", label: "In Progress" }]} />
          <Input label="Start Date" type="date" />
          <Input label="Due Date" type="date" />
          <Input label="Estimated Hours" type="number" placeholder="0" />
        </div>
      )}
      {createModalType === "project" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Input label="Project Title" placeholder="Enter project name" /></div>
          <div className="md:col-span-2"><Textarea label="Description" placeholder="Project description..." /></div>
          <Select label="Client" options={[{ value: "", label: "Select client" }, ...clients.map((c) => ({ value: c.id, label: c.companyName }))]} />
          <Select label="Department" options={[{ value: "", label: "Select department" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
          <Select label="Priority" options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" }]} />
          <Input label="Deadline" type="date" />
        </div>
      )}
      {createModalType === "employee" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Employee name" />
          <Input label="Email" type="email" placeholder="email@company.com" />
          <Input label="Phone" placeholder="+92 300 0000000" />
          <Select label="Department" options={[{ value: "", label: "Select department" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
          <Input label="Designation" placeholder="Job title" />
          <Select label="Employment Type" options={[{ value: "full_time", label: "Full Time" }, { value: "part_time", label: "Part Time" }, { value: "contract", label: "Contract" }, { value: "intern", label: "Intern" }]} />
          <Input label="Joining Date" type="date" />
        </div>
      )}
      {createModalType === "client" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Contact Name" placeholder="Client name" />
          <Input label="Company Name" placeholder="Company name" />
          <Input label="Email" type="email" placeholder="client@company.com" />
          <Input label="Phone" placeholder="+1 555 0000" />
          <Input label="Country" placeholder="Country" />
          <Select label="Status" options={[{ value: "active", label: "Active" }, { value: "lead", label: "Lead" }, { value: "on_hold", label: "On Hold" }]} />
        </div>
      )}
    </Modal>
  );
}
