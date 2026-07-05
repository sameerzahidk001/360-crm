"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { MODULES, PERMISSION_ACTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const roles = ["Admin", "Project Manager", "Team Lead", "Developer", "Designer", "HR", "Sales", "Employee", "Client"];

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Roles & Permissions" description="Manage role-based access control" actions={<Button size="sm">Create Custom Role</Button>} />
      <div className="flex flex-wrap gap-2">
        {roles.map((role, i) => (
          <button key={role} className={cn("px-4 py-2 rounded-xl text-sm font-medium border", i === 0 ? "bg-brand-blue text-white border-brand-blue" : "bg-surface border-border text-text-secondary hover:text-text-primary")}>{role}</button>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-main/50">
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">Module</th>
                {PERMISSION_ACTIONS.map((action) => (
                  <th key={action} className="px-3 py-3 text-center font-semibold text-text-secondary capitalize">{action}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODULES.map((module) => (
                <tr key={module} className="border-b border-border/50">
                  <td className="px-4 py-3 font-medium">{module}</td>
                  {PERMISSION_ACTIONS.map((action) => (
                    <td key={action} className="px-3 py-3 text-center">
                      <input type="checkbox" defaultChecked={module === "Dashboard" || (action === "view")} className="rounded border-border" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
