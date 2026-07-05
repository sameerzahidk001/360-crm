"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { clients, departments, teams, employees } from "@/data/mock";
import { useAppStore } from "@/store/app-store";

export default function CreateProjectPage() {
  const router = useRouter();
  const addToast = useAppStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: "Project created", message: "Your new project has been created successfully.", type: "success" });
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
          <Input label="Project Title" placeholder="Enter project name" required />
          <Textarea label="Description" placeholder="Describe the project goals and scope..." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select label="Client" options={[{ value: "", label: "Select client" }, ...clients.map((c) => ({ value: c.id, label: c.companyName }))]} />
            <Select label="Department" options={[{ value: "", label: "Select department" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
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
            <Button type="submit" className="gradient-sidebar-active border-0">Create Project</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
