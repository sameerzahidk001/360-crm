"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { teams } from "@/data/mock";

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Teams" description="Manage teams across departments" actions={<Button size="sm"><Plus className="h-4 w-4" /> Create Team</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <Card key={team.id} className="p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{team.name}</h3>
                <p className="text-sm text-text-secondary">{team.departmentName}</p>
              </div>
              <span className="text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-full">{team.activeProjects} projects</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Avatar name={team.leaderName} size="sm" />
              <div>
                <p className="text-sm font-medium">{team.leaderName}</p>
                <p className="text-xs text-text-secondary">Team Lead</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-3">{team.memberCount} members</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
