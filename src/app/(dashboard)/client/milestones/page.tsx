"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/badge";
import { projectMilestones } from "@/data/mock";
import { formatDate } from "@/lib/utils";

export default function ClientMilestonesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Project Milestones" description="Track key deliverables and deadlines" />
      <div className="space-y-3">
        {projectMilestones.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{m.title}</h3>
              <StatusBadge status={m.status === "completed" ? "completed" : m.status === "in_progress" ? "in_progress" : "todo"} />
            </div>
            <div className="flex justify-between text-xs mb-1"><span>Progress</span><span>{m.progress}%</span></div>
            <ProgressBar value={m.progress} />
            <p className="text-xs text-text-secondary mt-2">Due: {formatDate(m.dueDate)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
