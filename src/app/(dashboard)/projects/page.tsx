"use client";

import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { StatusBadge, PriorityBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { AvatarGroup } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";
import { projects, employees } from "@/data/mock";
import { formatDate } from "@/lib/utils";

export default function ProjectsPage() {
  const openCreateModal = useAppStore((s) => s.openCreateModal);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage and track all company projects"
        actions={
          <>
            <Button variant="outline" size="sm"><Filter className="h-4 w-4" /> Filter</Button>
            <Button size="sm" onClick={() => openCreateModal("project")}><Plus className="h-4 w-4" /> New Project</Button>
            <Link href="/projects/create"><Button variant="outline" size="sm">Full Form</Button></Link>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="p-5 hover:shadow-md transition-all duration-200 h-full">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-text-primary">{project.title}</h3>
                  <p className="text-xs text-text-secondary mt-0.5">{project.clientName}</p>
                </div>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-sm text-text-secondary line-clamp-2 mb-4">{project.description}</p>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-text-secondary">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <ProgressBar value={project.progress} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-secondary">Manager</p>
                    <p className="text-sm font-medium">{project.managerName}</p>
                  </div>
                  <AvatarGroup names={project.memberIds.map((id) => employees.find((e) => e.id === id)?.name || "").filter(Boolean)} />
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <PriorityBadge priority={project.priority} />
                  <span className="text-xs text-text-secondary">Due {formatDate(project.deadline)}</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}