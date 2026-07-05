"use client";

import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { departments } from "@/data/mock";

export default function DepartmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Departments" description="Manage company departments" actions={<Button size="sm"><Plus className="h-4 w-4" /> Add Department</Button>} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="p-5 hover:shadow-md transition-all">
            <h3 className="font-semibold text-lg">{dept.name}</h3>
            {dept.description && <p className="text-sm text-text-secondary mt-1">{dept.description}</p>}
            {dept.headName && (
              <div className="flex items-center gap-2 mt-4">
                <Avatar name={dept.headName} size="sm" />
                <div>
                  <p className="text-sm font-medium">{dept.headName}</p>
                  <p className="text-xs text-text-secondary">Department Head</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
              <div className="text-center"><p className="text-lg font-bold text-brand-blue">{dept.employeeCount}</p><p className="text-[10px] text-text-secondary">Employees</p></div>
              <div className="text-center"><p className="text-lg font-bold text-brand-cyan">{dept.teamCount}</p><p className="text-[10px] text-text-secondary">Teams</p></div>
              <div className="text-center"><p className="text-lg font-bold text-success">{dept.projectCount}</p><p className="text-[10px] text-text-secondary">Projects</p></div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
