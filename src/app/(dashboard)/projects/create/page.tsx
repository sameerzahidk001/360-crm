"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";
import { employees } from "@/data/mock";

export default function CreateProjectPage() {
  const router = useRouter();
  const addToast = useAppStore((s) => s.addToast);
  const addProject = useCrmDataStore((s) => s.addProject);
  const { clients, departments, teams } = useCrmDataStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      addToast({ title: "Project title is required", type: "warning" });
      return;
    }
    const client = clients.find((c) => c.id === clientId);
    const dept = departments.find((d) => d.id === departmentId);
    const manager = employees.find((e) => e.id === "e1") ?? employees[0];

    addProject({
      title: title.trim(),
      description: description.trim() || "New project",
      clientId: clientId || clients[0]?.id || "",
      clientName: client?.companyName ?? clients[0]?.companyName ?? "Client",
      departmentId: departmentId || departments[0]?.id || "",
      departmentName: dept?.name ?? departments[0]?.name ?? "General",
      managerId: manager.id,
      managerName: manager.name,
      memberIds: [manager.id],
      startDate: new Date().toISOString().split("T")[0],
      deadline: new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0],
      priority: "normal",
      status: "planning",
      progress: 0,
      taskCount: 0,
      completedTaskCount: 0,
    });

    addToast({ title: "Project created", message: title.trim(), type: "success" });
    router.push("/projects");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>
      <PageHeader title="Create Project" description="Set up a new project for your team" />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Project Title" placeholder="Enter project name" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Description" placeholder="Describe the project goals and scope..." value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Client" value={clientId} onChange={(e) => setClientId(e.target.value)} options={[{ value: "", label: "Select client" }, ...clients.map((c) => ({ value: c.id, label: c.companyName }))]} />
            <Select label="Department" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} options={[{ value: "", label: "Select department" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
            <Select label="Team" options={[{ value: "", label: "Select team" }, ...teams.map((t) => ({ value: t.id, label: t.name }))]} />
            <Select label="Project Manager" options={[{ value: "", label: "Select manager" }, ...employees.map((e) => ({ value: e.id, label: e.name }))]} />
            <Select label="Priority" options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" }]} />
            <Select label="Status" options={[{ value: "planning", label: "Planning" }, { value: "active", label: "Active" }]} />
            <Input label="Start Date" type="date" />
            <Input label="Deadline" type="date" />
            <Input label="Budget (optional)" type="number" placeholder="0" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/projects")}>Cancel</Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
