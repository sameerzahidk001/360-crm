"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { workspaces } from "@/data/mock";
import { StatusBadge } from "@/components/ui/badge";

export default function SuperAdminWorkspacesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Workspaces" description="Manage workspaces across all companies" actions={<Button size="sm">Create Workspace</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {workspaces.map((ws) => (
          <Card key={ws.id} className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl gradient-brand flex items-center justify-center text-white font-bold">{ws.logo}</div>
              <div>
                <h3 className="font-semibold">{ws.name}</h3>
                <StatusBadge status={ws.status === "archived" ? "cancelled" : "active"} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-bg-main"><p className="text-lg font-bold">{ws.members}</p><p className="text-[10px] text-text-secondary">Members</p></div>
              <div className="p-2 rounded-lg bg-bg-main"><p className="text-lg font-bold">{ws.departments}</p><p className="text-[10px] text-text-secondary">Depts</p></div>
              <div className="p-2 rounded-lg bg-bg-main"><p className="text-lg font-bold">{ws.projects}</p><p className="text-[10px] text-text-secondary">Projects</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
