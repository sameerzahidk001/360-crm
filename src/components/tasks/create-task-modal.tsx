"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useTaskStore } from "@/store/task-store";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import type { TaskPriority, TaskStatus, ProjectPriority, EmploymentType, ClientStatus } from "@/types";

export function CreateTaskModal() {
  const { createModalOpen, createModalType, closeCreateModal, addToast } = useAppStore();
  const router = useRouter();
  const { projects, employees, clients, departments, addProject, addEmployee, addClient } = useCrmDataStore();
  const addTask = useTaskStore((s) => s.addTask);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskProjectId, setTaskProjectId] = useState("");
  const [taskAssigneeId, setTaskAssigneeId] = useState("");
  const [taskPriority, setTaskPriority] = useState<TaskPriority>("normal");
  const [taskStatus, setTaskStatus] = useState<TaskStatus>("todo");
  const [taskDueDate, setTaskDueDate] = useState("");

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectClientId, setProjectClientId] = useState("");
  const [projectDeptId, setProjectDeptId] = useState("");
  const [projectPriority, setProjectPriority] = useState<ProjectPriority>("normal");
  const [projectDeadline, setProjectDeadline] = useState("");

  const [empName, setEmpName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empDeptId, setEmpDeptId] = useState("");
  const [empDesignation, setEmpDesignation] = useState("");
  const [empType, setEmpType] = useState<EmploymentType>("full_time");
  const [empJoinDate, setEmpJoinDate] = useState(new Date().toISOString().split("T")[0]);

  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientCountry, setClientCountry] = useState("");
  const [clientStatus, setClientStatus] = useState<ClientStatus>("active");

  useEffect(() => {
    if (!createModalOpen) return;
    setTaskTitle("");
    setTaskDescription("");
    setTaskProjectId("");
    setTaskAssigneeId("");
    setTaskPriority("normal");
    setTaskStatus("todo");
    setTaskDueDate("");
    setProjectTitle("");
    setProjectDescription("");
    setProjectClientId("");
    setProjectDeptId("");
    setProjectPriority("normal");
    setProjectDeadline("");
    setEmpName("");
    setEmpEmail("");
    setEmpPhone("");
    setEmpDeptId("");
    setEmpDesignation("");
    setEmpType("full_time");
    setEmpJoinDate(new Date().toISOString().split("T")[0]);
    setClientName("");
    setClientCompany("");
    setClientEmail("");
    setClientPhone("");
    setClientCountry("");
    setClientStatus("active");
  }, [createModalOpen, createModalType]);

  if (!createModalOpen || !createModalType) return null;

  const titles: Record<string, string> = {
    task: "Create New Task",
    project: "Create New Project",
    employee: "Add Employee",
    client: "Add Client",
  };

  const handleCreate = () => {
    if (createModalType === "task") {
      if (!taskTitle.trim()) {
        addToast({ title: "Task title is required", type: "warning" });
        return;
      }
      const project = projects.find((p) => p.id === taskProjectId) ?? projects[0];
      const assignee = employees.find((e) => e.id === taskAssigneeId);
      addTask({
        title: taskTitle.trim(),
        description: taskDescription.trim() || "New task",
        projectId: project?.id ?? "p1",
        projectName: project?.title ?? "General",
        assigneeIds: assignee ? [assignee.id] : [],
        assigneeNames: assignee ? [assignee.name] : ["Unassigned"],
        priority: taskPriority,
        status: taskStatus,
        startDate: new Date().toISOString().split("T")[0],
        dueDate: taskDueDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      });
      addToast({ title: "Task created", message: taskTitle.trim(), type: "success" });
      closeCreateModal();
      router.push("/tasks");
      return;
    }

    if (createModalType === "project") {
      if (!projectTitle.trim()) {
        addToast({ title: "Project title is required", type: "warning" });
        return;
      }
      const client = clients.find((c) => c.id === projectClientId) ?? clients[0];
      const dept = departments.find((d) => d.id === projectDeptId) ?? departments[0];
      const manager = employees.find((e) => e.id === "e1") ?? employees[0];
      addProject({
        title: projectTitle.trim(),
        description: projectDescription.trim() || "New project",
        clientId: client?.id ?? "",
        clientName: client?.companyName ?? "Client",
        departmentId: dept?.id ?? "",
        departmentName: dept?.name ?? "General",
        managerId: manager?.id ?? "",
        managerName: manager?.name ?? "Manager",
        memberIds: manager ? [manager.id] : [],
        startDate: new Date().toISOString().split("T")[0],
        deadline: projectDeadline || new Date(Date.now() + 90 * 86400000).toISOString().split("T")[0],
        priority: projectPriority,
        status: "planning",
        progress: 0,
        taskCount: 0,
        completedTaskCount: 0,
      });
      addToast({ title: "Project created", message: projectTitle.trim(), type: "success" });
      closeCreateModal();
      router.push("/projects");
      return;
    }

    if (createModalType === "employee") {
      if (!empName.trim() || !empEmail.trim() || !empDeptId || !empDesignation.trim()) {
        addToast({ title: "Fill required employee fields", type: "warning" });
        return;
      }
      const dept = departments.find((d) => d.id === empDeptId);
      addEmployee({
        name: empName.trim(),
        email: empEmail.trim(),
        phone: empPhone.trim() || "+92 300 0000000",
        departmentId: empDeptId,
        departmentName: dept?.name ?? "General",
        designation: empDesignation.trim(),
        joiningDate: empJoinDate,
        employmentType: empType,
        workingHours: "9:00 AM - 6:00 PM",
        status: "active",
      });
      addToast({ title: "Employee added", message: empName.trim(), type: "success" });
      closeCreateModal();
      router.push("/employees");
      return;
    }

    if (createModalType === "client") {
      if (!clientName.trim() || !clientCompany.trim() || !clientEmail.trim()) {
        addToast({ title: "Fill required client fields", type: "warning" });
        return;
      }
      addClient({
        name: clientName.trim(),
        companyName: clientCompany.trim(),
        email: clientEmail.trim(),
        phone: clientPhone.trim() || "—",
        country: clientCountry.trim() || "—",
        status: clientStatus,
        projectCount: 0,
      });
      addToast({ title: "Client added", message: clientCompany.trim(), type: "success" });
      closeCreateModal();
      router.push("/clients");
    }
  };

  return (
    <Modal
      open={createModalOpen}
      onClose={closeCreateModal}
      title={titles[createModalType]}
      size="lg"
      footer={
        <>
          <Button type="button" variant="outline" onClick={closeCreateModal}>Cancel</Button>
          <Button type="button" onClick={handleCreate}>
            {createModalType === "task" ? "Create Task" : createModalType === "project" ? "Create Project" : "Save"}
          </Button>
        </>
      }
    >
      {createModalType === "task" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Input label="Task Title" placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required /></div>
          <div className="md:col-span-2"><Textarea label="Description" placeholder="Describe the task..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} /></div>
          <Select label="Project" value={taskProjectId} onChange={(e) => setTaskProjectId(e.target.value)} options={[{ value: "", label: "Select project" }, ...projects.map((p) => ({ value: p.id, label: p.title }))]} />
          <Select label="Assignee" value={taskAssigneeId} onChange={(e) => setTaskAssigneeId(e.target.value)} options={[{ value: "", label: "Select employee" }, ...employees.map((e) => ({ value: e.id, label: e.name }))]} />
          <Select label="Priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value as TaskPriority)} options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" }]} />
          <Select label="Status" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value as TaskStatus)} options={[{ value: "todo", label: "To Do" }, { value: "in_progress", label: "In Progress" }]} />
          <Input label="Due Date" type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
        </div>
      )}
      {createModalType === "project" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"><Input label="Project Title" placeholder="Enter project name" value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} required /></div>
          <div className="md:col-span-2"><Textarea label="Description" placeholder="Project description..." value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} /></div>
          <Select label="Client" value={projectClientId} onChange={(e) => setProjectClientId(e.target.value)} options={[{ value: "", label: "Select client" }, ...clients.map((c) => ({ value: c.id, label: c.companyName }))]} />
          <Select label="Department" value={projectDeptId} onChange={(e) => setProjectDeptId(e.target.value)} options={[{ value: "", label: "Select department" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
          <Select label="Priority" value={projectPriority} onChange={(e) => setProjectPriority(e.target.value as ProjectPriority)} options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" }]} />
          <Input label="Deadline" type="date" value={projectDeadline} onChange={(e) => setProjectDeadline(e.target.value)} />
        </div>
      )}
      {createModalType === "employee" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Employee name" value={empName} onChange={(e) => setEmpName(e.target.value)} required />
          <Input label="Email" type="email" placeholder="email@company.com" value={empEmail} onChange={(e) => setEmpEmail(e.target.value)} required />
          <Input label="Phone" placeholder="+92 300 0000000" value={empPhone} onChange={(e) => setEmpPhone(e.target.value)} />
          <Select label="Department" value={empDeptId} onChange={(e) => setEmpDeptId(e.target.value)} options={[{ value: "", label: "Select department" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
          <Input label="Designation" placeholder="Job title" value={empDesignation} onChange={(e) => setEmpDesignation(e.target.value)} required />
          <Select label="Employment Type" value={empType} onChange={(e) => setEmpType(e.target.value as EmploymentType)} options={[{ value: "full_time", label: "Full Time" }, { value: "part_time", label: "Part Time" }, { value: "contract", label: "Contract" }, { value: "intern", label: "Intern" }]} />
          <Input label="Joining Date" type="date" value={empJoinDate} onChange={(e) => setEmpJoinDate(e.target.value)} />
        </div>
      )}
      {createModalType === "client" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Contact Name" placeholder="Client name" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
          <Input label="Company Name" placeholder="Company name" value={clientCompany} onChange={(e) => setClientCompany(e.target.value)} required />
          <Input label="Email" type="email" placeholder="client@company.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required />
          <Input label="Phone" placeholder="+1 555 0000" value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} />
          <Input label="Country" placeholder="Country" value={clientCountry} onChange={(e) => setClientCountry(e.target.value)} />
          <Select label="Status" value={clientStatus} onChange={(e) => setClientStatus(e.target.value as ClientStatus)} options={[{ value: "active", label: "Active" }, { value: "lead", label: "Lead" }, { value: "on_hold", label: "On Hold" }]} />
        </div>
      )}
    </Modal>
  );
}
