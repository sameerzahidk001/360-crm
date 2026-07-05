"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/badge";
import { projects } from "@/data/mock";
import { formatDate } from "@/lib/utils";

const clientProjects = projects.filter((p) => p.clientId === "c1");

export default function ClientProjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Projects" description="View all your assigned projects" />
      <div className="space-y-4">
        {clientProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="p-5 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{project.title}</h3>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="text-sm text-text-secondary">{project.description}</p>
                  <p className="text-xs text-text-secondary mt-2">Manager: {project.managerName} • Due {formatDate(project.deadline)}</p>
                </div>
                <div className="w-full md:w-48">
                  <div className="flex justify-between text-xs mb-1"><span>Progress</span><span>{project.progress}%</span></div>
                  <ProgressBar value={project.progress} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
