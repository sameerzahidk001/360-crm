import type { User, UserRole } from "@/types";
import { demoUsers } from "@/data/mock";

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case "super_admin":
      return "/super-admin";
    case "client":
      return "/client";
    default:
      return "/dashboard";
  }
}

export function findUserByEmail(email: string): User | null {
  const normalized = email.trim().toLowerCase();
  const match = Object.values(demoUsers).find((u) => u.email.toLowerCase() === normalized);
  return match ?? null;
}

export const loginAccounts = [
  { role: "company_admin" as const, label: "Company Admin", email: "sameer@360tech.com", password: "password", description: "Full company overview & settings" },
  { role: "manager" as const, label: "Manager", email: "ali@360tech.com", password: "password", description: "Team projects, tasks & approvals" },
  { role: "employee" as const, label: "Employee", email: "ahmed@360tech.com", password: "password", description: "Personal tasks, timer & daily reports" },
  { role: "hr" as const, label: "HR", email: "hr@360tech.com", password: "password", description: "Employees, attendance & leave" },
  { role: "super_admin" as const, label: "Super Admin", email: "admin@360workflow.com", password: "password", description: "Platform & all companies" },
  { role: "client" as const, label: "Client", email: "john@techcorp.com", password: "password", description: "Project progress & files" },
];
