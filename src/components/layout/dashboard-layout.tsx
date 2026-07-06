"use client";

import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { RoleGuard } from "./role-guard";
import { CreateTaskModal } from "@/components/tasks/create-task-modal";
import { TaskDetailPanel } from "@/components/tasks/task-detail-panel";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <RoleGuard>
      <div className="min-h-screen bg-bg-main">
        <Sidebar />
        <TopNav />
        <main
          className={cn(
            "pt-[4.25rem] min-h-screen transition-all duration-300 p-4 md:p-6",
            sidebarCollapsed ? "lg:pl-[calc(var(--sidebar-collapsed)+1rem)]" : "lg:pl-[calc(var(--sidebar-width)+1rem)]"
          )}
        >
          {children}
        </main>
        <CreateTaskModal />
        <TaskDetailPanel />
      </div>
    </RoleGuard>
  );
}
