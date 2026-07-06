"use client";

import Link from "next/link";
import { use, useState } from "react";
import { ArrowLeft, Calendar, Users, CheckSquare, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge, PriorityBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Avatar } from "@/components/ui/avatar";
import { TaskCard } from "@/components/tasks/task-card";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { tasks, employees, activities } from "@/data/mock";
import { useTaskStore } from "@/store/task-store";
import { useAppStore } from "@/store/app-store";
import { formatDate, formatRelative } from "@/lib/utils";
import type { ProjectPriority, ProjectStatus } from "@/types";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = useCrmDataStore((s) => s.projects.find((p) => p.id === id));
  const updateProject = useCrmDataStore((s) => s.updateProject);
  const addToast = useAppStore((s) => s.addToast);
  const taskList = useTaskStore((s) => s.tasks);
  const [editOpen, setEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("active");
  const [priority, setPriority] = useState<ProjectPriority>("normal");
  const [deadline, setDeadline] = useState("");

  const projectTasks = taskList.filter((t) => t.projectId === id);
  const projectActivities = activities.filter((a) => a.target.toLowerCase().includes(project?.title.toLowerCase().split(" ")[0] || ""));

  if (!project) {
    return <div className="text-center py-20"><p className="text-text-secondary">Project not found</p></div>;
  }

  const memberNames = project.memberIds.map((mid) => employees.find((e) => e.id === mid)?.name || "").filter(Boolean);

  const openEdit = () => {
    setTitle(project.title);
    setDescription(project.description);
    setStatus(project.status);
    setPriority(project.priority);
    setDeadline(project.deadline);
    setEditOpen(true);
  };

  const handleSave = () => {
    if (!title.trim()) {
      addToast({ title: "Project title is required", type: "warning" });
      return;
    }
    updateProject(id, {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      deadline,
    });
    addToast({ title: "Project updated", type: "success" });
    setEditOpen(false);
  };

  return (
    <div className="space-y-6">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-2xl font-bold text-text-primary">{project.title}</h1>
            <StatusBadge status={project.status} />
            <PriorityBadge priority={project.priority} />
          </div>
          <p className="text-text-secondary">{project.description}</p>
        </div>
        <Button type="button" onClick={openEdit}>Edit Project</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Progress", value: `${project.progress}%`, icon: CheckSquare },
          { label: "Tasks", value: `${project.completedTaskCount}/${project.taskCount}`, icon: FileText },
          { label: "Team", value: `${memberNames.length} members`, icon: Users },
          { label: "Deadline", value: formatDate(project.deadline), icon: Calendar },
        ].map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent-orange/10 text-accent-orange"><stat.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-xs text-text-secondary">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-bold text-accent-orange">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} size="md" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Tasks ({projectTasks.length})</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {projectTasks.map((task) => <TaskCard key={task.id} task={task} compact />)}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-bg-main">
                <Avatar name={project.managerName} />
                <div>
                  <p className="text-sm font-medium">{project.managerName}</p>
                  <p className="text-xs text-text-secondary">Project Manager</p>
                </div>
              </div>
              {memberNames.map((name) => (
                <div key={name} className="flex items-center gap-3 p-2">
                  <Avatar name={name} size="sm" />
                  <p className="text-sm">{name}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {(projectActivities.length > 0 ? projectActivities : activities.slice(0, 4)).map((a) => (
                <div key={a.id} className="text-sm">
                  <p><span className="font-medium">{a.userName}</span> <span className="text-text-secondary">{a.action}</span></p>
                  <p className="text-xs text-text-secondary/60">{formatRelative(a.timestamp)}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Details</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-text-secondary">Client</span><span>{project.clientName}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Department</span><span>{project.departmentName}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Start Date</span><span>{formatDate(project.startDate)}</span></div>
              {project.budget && <div className="flex justify-between"><span className="text-text-secondary">Budget</span><span>${project.budget.toLocaleString()}</span></div>}
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit Project"
        size="lg"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleSave}>Save Changes</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              options={[
                { value: "planning", label: "Planning" },
                { value: "active", label: "Active" },
                { value: "on_hold", label: "On Hold" },
                { value: "in_review", label: "In Review" },
                { value: "completed", label: "Completed" },
              ]}
            />
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as ProjectPriority)}
              options={[
                { value: "low", label: "Low" },
                { value: "normal", label: "Normal" },
                { value: "high", label: "High" },
                { value: "urgent", label: "Urgent" },
              ]}
            />
            <Input label="Deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
