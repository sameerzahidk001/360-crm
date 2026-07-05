"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { employees, tasks } from "@/data/mock";
import { isOverdue } from "@/lib/utils";

export default function PerformancePage() {
  const performanceData = employees.map((emp) => {
    const empTasks = tasks.filter((t) => t.assigneeIds.includes(emp.id));
    const completed = empTasks.filter((t) => t.status === "completed").length;
    const overdue = empTasks.filter((t) => isOverdue(t.dueDate) && t.status !== "completed").length;
    const rate = empTasks.length > 0 ? Math.round((completed / empTasks.length) * 100) : 0;
    return { ...emp, totalTasks: empTasks.length, completed, overdue, rate, hoursLogged: Math.floor(Math.random() * 40) + 20 };
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Employee Performance" description="Work statistics and performance metrics" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {performanceData.map((emp) => (
          <Card key={emp.id} className="p-5">
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={emp.name} />
              <div>
                <p className="font-semibold">{emp.name}</p>
                <p className="text-xs text-text-secondary">{emp.designation} • {emp.departmentName}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
              <div><p className="text-lg font-bold">{emp.totalTasks}</p><p className="text-[10px] text-text-secondary">Assigned</p></div>
              <div><p className="text-lg font-bold text-success">{emp.completed}</p><p className="text-[10px] text-text-secondary">Completed</p></div>
              <div><p className="text-lg font-bold text-danger">{emp.overdue}</p><p className="text-[10px] text-text-secondary">Overdue</p></div>
              <div><p className="text-lg font-bold text-brand-blue">{emp.hoursLogged}h</p><p className="text-[10px] text-text-secondary">Logged</p></div>
            </div>
            <ProgressBar value={emp.rate} showLabel />
            <p className="text-xs text-text-secondary mt-1 text-right">{emp.rate}% completion rate</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
