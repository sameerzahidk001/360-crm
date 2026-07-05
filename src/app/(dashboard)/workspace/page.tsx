"use client";

import { Users, Building, UsersRound, FolderOpen, Settings } from "lucide-react";
import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvatarGroup } from "@/components/ui/avatar";
import { workspaces, departments, teams, projects, employees } from "@/data/mock";
import Link from "next/link";

const workspace = workspaces[0];

export default function WorkspacePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Workspace"
        description="Company workspace overview and structure"
        actions={<Button variant="outline" size="sm"><Settings className="h-4 w-4" /> Settings</Button>}
      />

      <Card className="p-6 gradient-card-accent border-brand-blue/20">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {workspace.logo}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">{workspace.name}</h2>
            <p className="text-sm text-text-secondary mt-1">
              Company → Department → Team → Project → Task
            </p>
            <p className="text-xs text-text-secondary mt-2">Created {workspace.createdAt}</p>
          </div>
          <AvatarGroup names={employees.slice(0, 5).map((e) => e.name)} max={5} />
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard title="Members" value={workspace.members} icon={<Users className="h-5 w-5" />} accent />
        <KPICard title="Departments" value={workspace.departments} icon={<Building className="h-5 w-5" />} />
        <KPICard title="Teams" value={teams.length} icon={<UsersRound className="h-5 w-5" />} />
        <KPICard title="Active Projects" value={workspace.projects} icon={<FolderOpen className="h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Departments</h3>
            <Link href="/departments"><Button variant="ghost" size="sm">View all</Button></Link>
          </div>
          <div className="space-y-2">
            {departments.slice(0, 5).map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-main">
                <span className="text-sm font-medium">{d.name}</span>
                <span className="text-xs text-text-secondary">{d.employeeCount} members</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Teams</h3>
            <Link href="/teams"><Button variant="ghost" size="sm">View all</Button></Link>
          </div>
          <div className="space-y-2">
            {teams.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-main">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-text-secondary">{t.departmentName}</p>
                </div>
                <span className="text-xs text-text-secondary">{t.memberCount} members</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Projects</h3>
          <Link href="/projects"><Button variant="ghost" size="sm">View all</Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.slice(0, 4).map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className="p-3 rounded-xl bg-bg-main hover:bg-brand-blue/5 transition-colors">
              <p className="text-sm font-medium">{p.title}</p>
              <p className="text-xs text-text-secondary">{p.departmentName} • {p.progress}% complete</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
