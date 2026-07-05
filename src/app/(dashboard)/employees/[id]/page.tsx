"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft, Mail, Phone, Calendar, Briefcase } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TaskCard } from "@/components/tasks/task-card";
import { employees, tasks, projects, leaveRequests } from "@/data/mock";
import { formatDate } from "@/lib/utils";

export default function EmployeeProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const employee = employees.find((e) => e.id === id);

  if (!employee) return <div className="text-center py-20 text-text-secondary">Employee not found</div>;

  const empTasks = tasks.filter((t) => t.assigneeIds.includes(id));
  const completedTasks = empTasks.filter((t) => t.status === "completed");
  const empProjects = projects.filter((p) => p.memberIds.includes(id));
  const empLeaves = leaveRequests.filter((l) => l.employeeId === id);
  const completionRate = empTasks.length > 0 ? Math.round((completedTasks.length / empTasks.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <Link href="/employees" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Employees
      </Link>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <Card className="p-6 text-center w-full md:w-64">
          <Avatar name={employee.name} size="lg" className="mx-auto mb-3" />
          <h2 className="text-xl font-bold">{employee.name}</h2>
          <p className="text-sm text-text-secondary">{employee.designation}</p>
          <StatusBadge status={employee.status} />
          <div className="mt-4 space-y-2 text-sm text-left">
            <div className="flex items-center gap-2 text-text-secondary"><Mail className="h-4 w-4" />{employee.email}</div>
            <div className="flex items-center gap-2 text-text-secondary"><Phone className="h-4 w-4" />{employee.phone}</div>
            <div className="flex items-center gap-2 text-text-secondary"><Calendar className="h-4 w-4" />Joined {formatDate(employee.joiningDate)}</div>
            <div className="flex items-center gap-2 text-text-secondary"><Briefcase className="h-4 w-4" />{employee.departmentName}</div>
          </div>
        </Card>

        <div className="flex-1 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Assigned Tasks", value: empTasks.length },
              { label: "Completed", value: completedTasks.length },
              { label: "Projects", value: empProjects.length },
              { label: "Completion Rate", value: `${completionRate}%` },
            ].map((s) => (
              <Card key={s.label} className="p-4 text-center">
                <p className="text-2xl font-bold text-brand-blue">{s.value}</p>
                <p className="text-xs text-text-secondary mt-1">{s.label}</p>
              </Card>
            ))}
          </div>

          <Card className="p-5">
            <p className="text-sm font-medium mb-2">Task Completion</p>
            <ProgressBar value={completionRate} showLabel />
          </Card>

          <Card>
            <CardHeader><CardTitle>Current Tasks</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {empTasks.filter((t) => t.status !== "completed").map((t) => <TaskCard key={t.id} task={t} compact />)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Leave History</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {empLeaves.length > 0 ? empLeaves.map((l) => (
                <div key={l.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-main">
                  <div>
                    <p className="text-sm font-medium capitalize">{l.leaveType.replace("_", " ")}</p>
                    <p className="text-xs text-text-secondary">{l.startDate} - {l.endDate}</p>
                  </div>
                  <StatusBadge status={l.status} />
                </div>
              )) : <p className="text-sm text-text-secondary">No leave records</p>}
            </CardContent>
          </Card>

          {employee.skills && (
            <Card className="p-5">
              <p className="text-sm font-medium mb-3">Skills</p>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-medium">{s}</span>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
