"use client";

import { FolderKanban, CheckSquare, FileStack, MessageSquare } from "lucide-react";
import Link from "next/link";
import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/badge";
import { projects, projectMilestones, clientFeedback } from "@/data/mock";
import { formatDate } from "@/lib/utils";

const clientProjects = projects.filter((p) => p.clientId === "c1");

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Welcome, John" description="Track your project progress and deliverables" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Active Projects" value={clientProjects.length} icon={<FolderKanban className="h-5 w-5" />} accent />
        <KPICard title="Completed Tasks" value={clientProjects.reduce((a, p) => a + p.completedTaskCount, 0)} icon={<CheckSquare className="h-5 w-5" />} />
        <KPICard title="Milestones" value={projectMilestones.length} icon={<FileStack className="h-5 w-5" />} />
        <KPICard title="Feedback Given" value={clientFeedback.length} icon={<MessageSquare className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {clientProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="p-5 hover:shadow-md transition-all h-full">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">{project.title}</h3>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-sm text-text-secondary mb-4">{project.description}</p>
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span>Progress</span><span className="font-medium">{project.progress}%</span></div>
                <ProgressBar value={project.progress} />
              </div>
              <p className="text-xs text-text-secondary">Deadline: {formatDate(project.deadline)}</p>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Upcoming Milestones</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {projectMilestones.filter((m) => m.status !== "completed").map((m) => (
            <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-main">
              <div>
                <p className="text-sm font-medium">{m.title}</p>
                <p className="text-xs text-text-secondary">Due {formatDate(m.dueDate)}</p>
              </div>
              <StatusBadge status={m.status === "in_progress" ? "in_progress" : "todo"} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
