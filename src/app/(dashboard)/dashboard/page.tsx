"use client";

import { useAppStore } from "@/store/app-store";
import { CompanyAdminDashboard } from "@/components/dashboards/company-admin-dashboard";
import { ManagerDashboard } from "@/components/dashboards/manager-dashboard";
import { EmployeeDashboard } from "@/components/dashboards/employee-dashboard";
import { HRDashboard } from "@/components/dashboards/hr-dashboard";
import { ROLE_LABELS } from "@/lib/constants";

export default function DashboardPage() {
  const user = useAppStore((s) => s.user);

  const dashboards = {
    company_admin: <CompanyAdminDashboard />,
    manager: <ManagerDashboard />,
    team_lead: <ManagerDashboard />,
    employee: <EmployeeDashboard />,
    hr: <HRDashboard />,
    accountant: <CompanyAdminDashboard />,
    custom: <CompanyAdminDashboard />,
  };

  const Dashboard = dashboards[user.role as keyof typeof dashboards] ?? <CompanyAdminDashboard />;

  return (
    <div>
      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-semibold">
        {ROLE_LABELS[user.role]} Dashboard
      </div>
      {Dashboard}
    </div>
  );
}
