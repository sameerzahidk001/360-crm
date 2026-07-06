import type { TaskStatus, TaskPriority, ProjectStatus, ProjectPriority } from "@/types";

export const COLORS = {
  black: "#000000",
  orange: "#F58220",
  orangeDark: "#D96E15",
  orangeLight: "#FF9A47",
  background: "#F5F5F5",
  white: "#FFFFFF",
  text: "#111111",
  textSecondary: "#6B7280",
  border: "#E5E5E5",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
};

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  in_review: "In Review",
  completed: "Completed",
  on_hold: "On Hold",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: "Planning",
  active: "Active",
  on_hold: "On Hold",
  in_review: "In Review",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const PROJECT_PRIORITY_LABELS: Record<ProjectPriority, string> = {
  low: "Low",
  normal: "Normal",
  high: "High",
  urgent: "Urgent",
};

export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  company_admin: "Company Admin",
  manager: "Manager",
  team_lead: "Team Lead",
  employee: "Employee",
  hr: "HR",
  accountant: "Accountant",
  client: "Client",
  custom: "Custom Role",
};

export const MODULES = [
  "Dashboard",
  "Projects",
  "Tasks",
  "Employees",
  "Departments",
  "Teams",
  "Clients",
  "Attendance",
  "Leave",
  "Daily Reports",
  "Discussions",
  "Documents",
  "Reports",
  "Settings",
];

export const PERMISSION_ACTIONS = ["view", "create", "edit", "delete", "assign", "approve", "export"];
