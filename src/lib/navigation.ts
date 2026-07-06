import type { UserRole } from "@/types";

export interface NavItem {
  label: string;
  href?: string;
  icon: string;
  children?: NavItem[];
  roles?: UserRole[];
}

export const navigation: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "My Work", href: "/my-work", icon: "Briefcase" },
  { label: "Workspace", href: "/workspace", icon: "Layers" },
  {
    label: "Work Management",
    icon: "FolderKanban",
    children: [
      { label: "Projects", href: "/projects", icon: "FolderOpen" },
      { label: "Tasks", href: "/tasks", icon: "CheckSquare" },
      { label: "Calendar", href: "/calendar", icon: "Calendar" },
    ],
  },
  {
    label: "Company",
    icon: "Building2",
    children: [
      { label: "Employees", href: "/employees", icon: "Users" },
      { label: "Departments", href: "/departments", icon: "Building" },
      { label: "Teams", href: "/teams", icon: "UsersRound" },
      { label: "Clients", href: "/clients", icon: "Handshake" },
    ],
  },
  {
    label: "HR",
    icon: "Heart",
    children: [
      { label: "Attendance", href: "/attendance", icon: "Clock" },
      { label: "Leave Requests", href: "/leave", icon: "Palmtree" },
    ],
  },
  {
    label: "Reports",
    icon: "BarChart3",
    children: [
      { label: "Daily Reports", href: "/daily-reports", icon: "FileText" },
      { label: "Performance", href: "/performance", icon: "TrendingUp" },
      { label: "Analytics", href: "/reports", icon: "PieChart" },
    ],
  },
  { label: "Documents", href: "/documents", icon: "FileStack" },
  { label: "Discussions", href: "/discussions", icon: "MessagesSquare" },
  { label: "Announcements", href: "/announcements", icon: "Megaphone" },
  { label: "Notifications", href: "/notifications", icon: "Bell" },
  { label: "Time Tracking", href: "/time-tracking", icon: "Timer" },
  { label: "Activity Log", href: "/activity", icon: "Activity" },
  {
    label: "Settings",
    icon: "Settings",
    children: [
      { label: "Roles & Permissions", href: "/settings/roles", icon: "Shield" },
      { label: "Company Settings", href: "/settings/company", icon: "Building2" },
      { label: "System Settings", href: "/settings/system", icon: "Settings" },
    ],
  },
];

export const hrNav: NavItem[] = [
  { label: "HR Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Employees", href: "/employees", icon: "Users" },
  { label: "Departments", href: "/departments", icon: "Building" },
  { label: "Attendance", href: "/attendance", icon: "Clock" },
  { label: "Leave Requests", href: "/leave", icon: "Palmtree" },
  { label: "Daily Reports", href: "/daily-reports", icon: "FileText" },
  { label: "Discussions", href: "/discussions", icon: "MessagesSquare" },
  { label: "Announcements", href: "/announcements", icon: "Megaphone" },
  { label: "Documents", href: "/documents", icon: "FileStack" },
  { label: "Reports", href: "/reports", icon: "PieChart" },
];

export const clientNav: NavItem[] = [
  { label: "Client Dashboard", href: "/client", icon: "LayoutDashboard" },
  { label: "My Projects", href: "/client/projects", icon: "FolderOpen" },
  { label: "Milestones", href: "/client/milestones", icon: "CheckSquare" },
  { label: "Files", href: "/client/files", icon: "FileStack" },
  { label: "Discussions", href: "/discussions", icon: "MessagesSquare" },
  { label: "Feedback", href: "/client/feedback", icon: "MessageSquare" },
  { label: "Support", href: "/client/support", icon: "Headphones" },
];

export const superAdminNav: NavItem[] = [
  { label: "Global Dashboard", href: "/super-admin", icon: "Globe" },
  { label: "Companies", href: "/super-admin/companies", icon: "Building2" },
  { label: "Workspaces", href: "/super-admin/workspaces", icon: "Layers" },
  { label: "Users", href: "/super-admin/users", icon: "Users" },
  { label: "Subscriptions", href: "/super-admin/subscriptions", icon: "CreditCard" },
  { label: "Audit Logs", href: "/super-admin/audit", icon: "ScrollText" },
  { label: "Security", href: "/super-admin/security", icon: "Lock" },
  { label: "Platform Settings", href: "/super-admin/settings", icon: "Settings" },
];
