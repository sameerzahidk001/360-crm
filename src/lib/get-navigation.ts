import type { UserRole } from "@/types";
import { navigation, superAdminNav, clientNav, hrNav } from "./navigation";

export function getNavigation(role: UserRole) {
  switch (role) {
    case "super_admin":
      return superAdminNav;
    case "client":
      return clientNav;
    case "hr":
      return hrNav;
    case "employee":
      return [
        { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
        { label: "My Work", href: "/my-work", icon: "Briefcase" },
        {
          label: "Work Management",
          icon: "FolderKanban",
          children: [
            { label: "Tasks", href: "/tasks", icon: "CheckSquare" },
            { label: "Calendar", href: "/calendar", icon: "Calendar" },
          ],
        },
        { label: "Daily Reports", href: "/daily-reports", icon: "FileText" },
        { label: "Attendance", href: "/attendance", icon: "Clock" },
        { label: "Leave", href: "/leave", icon: "Palmtree" },
        { label: "Time Tracking", href: "/time-tracking", icon: "Timer" },
        { label: "Discussions", href: "/discussions", icon: "MessagesSquare" },
        { label: "Announcements", href: "/announcements", icon: "Megaphone" },
        { label: "Notifications", href: "/notifications", icon: "Bell" },
        { label: "Profile", href: "/profile", icon: "Settings" },
      ];
    case "manager":
    case "team_lead":
      return navigation;
    default:
      return navigation;
  }
}
