"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, FolderKanban, FolderOpen, CheckSquare, Calendar,
  Building2, Users, Building, UsersRound, Handshake, Heart, Clock, Palmtree,
  BarChart3, FileText, TrendingUp, PieChart, FileStack, Megaphone, Bell,
  Timer, Activity, Settings, Shield, ChevronDown, ChevronLeft, Globe, Layers,
  CreditCard, ScrollText, Lock, MessageSquare, Headphones, MessagesSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { navigation } from "@/lib/navigation";
import { getNavigation } from "@/lib/get-navigation";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Briefcase, FolderKanban, FolderOpen, CheckSquare, Calendar,
  Building2, Users, Building, UsersRound, Handshake, Heart, Clock, Palmtree,
  BarChart3, FileText, TrendingUp, PieChart, FileStack, Megaphone, Bell,
  Timer, Activity, Settings, Shield, Globe, Layers, CreditCard, ScrollText, Lock,
  MessageSquare, Headphones, MessagesSquare,
};

function NavIcon({ name }: { name: string }) {
  const Icon = iconMap[name] || LayoutDashboard;
  return <Icon className="h-5 w-5 shrink-0" />;
}

function NavLink({ item, collapsed }: { item: { label: string; href?: string; icon: string }; collapsed: boolean }) {
  const pathname = usePathname();
  const isActive = item.href === pathname || (item.href !== "/dashboard" && item.href && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-accent-orange text-white shadow-md shadow-accent-orange/30"
          : "text-white/60 hover:text-white hover:bg-white/8"
      )}
      title={collapsed ? item.label : undefined}
    >
      <NavIcon name={item.icon} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

function NavGroup({ item, collapsed }: { item: { label: string; icon: string; children?: { label: string; href?: string; icon: string }[] }; collapsed: boolean }) {
  const pathname = usePathname();
  const isChildActive = item.children?.some((c) => c.href && pathname.startsWith(c.href));
  const [open, setOpen] = useState(isChildActive ?? false);

  if (collapsed) {
    return (
      <div className="relative group">
        <button
          className={cn(
            "flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
            isChildActive ? "bg-accent-orange text-white" : "text-white/60 hover:text-white hover:bg-white/8"
          )}
          title={item.label}
        >
          <NavIcon name={item.icon} />
        </button>
        <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
          <div className="bg-navy border border-white/10 rounded-xl shadow-xl py-2 min-w-[180px]">
            <p className="px-3 py-1.5 text-xs font-semibold text-white/50 uppercase">{item.label}</p>
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href || "#"}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm transition-colors",
                  pathname === child.href ? "text-accent-orange" : "text-white/60 hover:text-white"
                )}
              >
                <NavIcon name={child.icon} />
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
          isChildActive ? "text-white" : "text-white/70 hover:text-white hover:bg-white/10"
        )}
      >
        <span className="flex items-center gap-3">
          <NavIcon name={item.icon} />
          {item.label}
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-white/10 pl-3">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href || "#"}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all",
                  pathname === child.href || pathname.startsWith(child.href + "/")
                  ? "text-accent-orange bg-white/8"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <NavIcon name={child.icon} />
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, mobileSidebarOpen, setMobileSidebarOpen, user } = useAppStore();
  const navItems = getNavigation(user.role);

  const content = (
    <aside
      className={cn(
        "fixed top-0 left-0 z-40 h-full bg-black flex flex-col transition-all duration-300 border-r border-white/8",
        sidebarCollapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]",
        "lg:translate-x-0",
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className={cn("flex items-center h-16 px-4 border-b border-white/10", sidebarCollapsed ? "justify-center" : "gap-3")}>
        <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center shrink-0">
          <span className="text-black font-black text-sm">360</span>
        </div>
        {!sidebarCollapsed && (
          <div>
            <h1 className="text-white font-bold text-sm leading-tight">
              360<span className="text-accent-orange">tech</span>solution
            </h1>
            <p className="text-white/40 text-[10px]">WorkFlow</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-1">
        {navItems.map((item) =>
          item.children ? (
            <NavGroup key={item.label} item={item} collapsed={sidebarCollapsed} />
          ) : (
            <NavLink key={item.label} item={item} collapsed={sidebarCollapsed} />
          )
        )}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center w-full py-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", sidebarCollapsed && "rotate-180")} />
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-30 bg-navy/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileSidebarOpen(false)} />
      )}
      {content}
    </>
  );
}
