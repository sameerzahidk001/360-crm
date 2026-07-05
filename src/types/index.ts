export type UserRole =
  | "super_admin"
  | "company_admin"
  | "manager"
  | "team_lead"
  | "employee"
  | "hr"
  | "accountant"
  | "client"
  | "custom";

export type PermissionAction =
  | "view"
  | "create"
  | "edit"
  | "delete"
  | "assign"
  | "approve"
  | "export";

export type TaskStatus = "todo" | "in_progress" | "in_review" | "completed" | "on_hold";
export type TaskPriority = "low" | "normal" | "high" | "urgent";
export type ProjectStatus = "planning" | "active" | "on_hold" | "in_review" | "completed" | "cancelled";
export type ProjectPriority = "low" | "normal" | "high" | "urgent";
export type EmployeeStatus = "active" | "on_leave" | "probation" | "resigned" | "terminated" | "inactive";
export type EmploymentType = "full_time" | "part_time" | "contract" | "intern" | "freelancer";
export type ClientStatus = "active" | "lead" | "on_hold" | "completed" | "inactive";
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";
export type LeaveType = "annual" | "sick" | "casual" | "emergency" | "unpaid" | "work_from_home";
export type AttendanceStatus = "present" | "absent" | "late" | "half_day" | "leave" | "work_from_home";
export type DailyReportStatus = "submitted" | "reviewed" | "needs_update";
export type AnnouncementPriority = "normal" | "important" | "urgent";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  departmentId?: string;
  teamId?: string;
  status: "active" | "inactive";
}

export interface Department {
  id: string;
  name: string;
  headId?: string;
  headName?: string;
  employeeCount: number;
  teamCount: number;
  projectCount: number;
  description?: string;
}

export interface Team {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  leaderId: string;
  leaderName: string;
  memberCount: number;
  activeProjects: number;
}

export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  departmentId: string;
  departmentName: string;
  designation: string;
  managerId?: string;
  managerName?: string;
  teamId?: string;
  teamName?: string;
  joiningDate: string;
  employmentType: EmploymentType;
  workingHours: string;
  status: EmployeeStatus;
  address?: string;
  skills?: string[];
}

export interface Client {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  address?: string;
  country?: string;
  status: ClientStatus;
  accountManagerId?: string;
  accountManagerName?: string;
  projectCount: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  departmentId: string;
  departmentName: string;
  teamId?: string;
  teamName?: string;
  managerId: string;
  managerName: string;
  memberIds: string[];
  startDate: string;
  deadline: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  progress: number;
  budget?: number;
  tags?: string[];
  taskCount: number;
  completedTaskCount: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  assigneeIds: string[];
  assigneeNames: string[];
  departmentId?: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string;
  dueDate: string;
  estimatedHours?: number;
  tags?: string[];
  checklist?: { id: string; text: string; completed: boolean }[];
  subtaskCount?: number;
  commentCount?: number;
  attachmentCount?: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  workingHours?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  submittedAt: string;
}

export interface DailyReport {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  tasksWorkedOn: string;
  workCompleted: string;
  currentStatus: string;
  blockers?: string;
  plansForTomorrow: string;
  totalHours: number;
  notes?: string;
  status: DailyReportStatus;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: string;
  publishDate: string;
  priority: AnnouncementPriority;
  authorName: string;
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  timestamp: string;
}

export interface Document {
  id: string;
  name: string;
  category: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  projectId?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  icon: string;
  children?: NavItem[];
  roles?: UserRole[];
}
