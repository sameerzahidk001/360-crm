"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search, Bell, Plus, Menu, Sun, Moon, User, Settings, LogOut,
  ChevronDown, FolderOpen, CheckSquare, UserPlus, Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { Avatar } from "@/components/ui/avatar";
import { ROLE_LABELS } from "@/lib/constants";
import { tasks, projects, employees, clients, demoUsers } from "@/data/mock";
import { getDashboardRoute } from "@/lib/auth";
import { formatRelative } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/my-work": "My Work",
  "/tasks": "Tasks",
  "/projects": "Projects",
  "/calendar": "Calendar",
  "/employees": "Employees",
  "/attendance": "Attendance",
  "/leave": "Leave Requests",
  "/time-tracking": "Time Tracking",
  "/notifications": "Notifications",
  "/profile": "Profile",
};

export function TopNav() {
  const pathname = usePathname();
  const { user, setUser, sidebarCollapsed, setMobileSidebarOpen, notifications, openCreateModal, markNotificationRead, markAllNotificationsRead, addToast } = useAppStore();
  const { theme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const roleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const pageTitle = Object.entries(pageTitles).find(([path]) => pathname === path || pathname.startsWith(path + "/"))?.[1] ?? "360 WorkFlow";

  const switchRole = (roleKey: keyof typeof demoUsers) => {
    const newUser = demoUsers[roleKey];
    setUser(newUser);
    setRoleOpen(false);
    setProfileOpen(false);
    addToast({ title: `Switched to ${ROLE_LABELS[newUser.role]}`, type: "info" });
    window.location.href = getDashboardRoute(newUser.role);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (createRef.current && !createRef.current.contains(e.target as Node)) setCreateOpen(false);
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const searchResults = searchQuery.length > 1 ? {
    tasks: tasks.filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    projects: projects.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    employees: employees.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
    clients: clients.filter((c) => c.companyName.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 3),
  } : null;

  const hasResults = searchResults && (
    searchResults.tasks.length + searchResults.projects.length +
    searchResults.employees.length + searchResults.clients.length > 0
  );

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-[4.25rem] bg-black border-b border-white/8",
        "flex items-center gap-4 px-4 lg:px-6 transition-all duration-300 shadow-lg shadow-black/20",
        sidebarCollapsed ? "left-[var(--sidebar-collapsed)]" : "left-[var(--sidebar-width)]",
        "left-0 lg:left-[var(--sidebar-width)]",
        sidebarCollapsed && "lg:left-[var(--sidebar-collapsed)]"
      )}
    >
      {/* Mobile menu */}
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page title — desktop */}
      <div className="hidden lg:block shrink-0 min-w-[140px]">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-accent-orange">360 WorkFlow</p>
        <h2 className="text-sm font-bold text-white leading-tight truncate">{pageTitle}</h2>
      </div>

      {/* Search */}
      <div ref={searchRef} className="relative flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search tasks, projects, employees..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white/8 border border-white/10 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-accent-orange/50 focus:ring-2 focus:ring-accent-orange/20 transition-all"
          />
        </div>
        {searchOpen && searchQuery.length > 1 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#141414] border border-white/10 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto">
            {hasResults ? (
              <div className="p-2">
                {searchResults!.tasks.length > 0 && (
                  <div className="mb-2">
                    <p className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider">Tasks</p>
                    {searchResults!.tasks.map((t) => (
                      <Link key={t.id} href="/tasks" onClick={() => setSearchOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/8 text-sm text-white/90">
                        <CheckSquare className="h-4 w-4 text-accent-orange" />
                        <span>{t.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults!.projects.length > 0 && (
                  <div className="mb-2">
                    <p className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider">Projects</p>
                    {searchResults!.projects.map((p) => (
                      <Link key={p.id} href={`/projects/${p.id}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/8 text-sm text-white/90">
                        <FolderOpen className="h-4 w-4 text-accent-orange" />
                        <span>{p.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults!.employees.length > 0 && (
                  <div className="mb-2">
                    <p className="px-2 py-1 text-[10px] font-bold text-white/40 uppercase tracking-wider">Employees</p>
                    {searchResults!.employees.map((e) => (
                      <Link key={e.id} href={`/employees/${e.id}`} onClick={() => setSearchOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/8 text-sm text-white/90">
                        <User className="h-4 w-4 text-accent-orange" />
                        <span>{e.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="p-4 text-sm text-white/50 text-center">No results found</p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <div ref={createRef} className="relative">
          <button
            onClick={() => setCreateOpen(!createOpen)}
            className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-accent-orange hover:bg-[#D96E15] text-white text-sm font-semibold transition-all shadow-lg shadow-accent-orange/25"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </button>
          {createOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-[#141414] border border-white/10 rounded-xl shadow-2xl z-50 py-1.5 overflow-hidden">
              {[
                { label: "New Task", icon: CheckSquare, type: "task" as const },
                { label: "New Project", icon: FolderOpen, type: "project" as const },
                { label: "Add Employee", icon: UserPlus, type: "employee" as const },
                { label: "Add Client", icon: Handshake, type: "client" as const },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => { openCreateModal(item.type); setCreateOpen(false); }}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-white/80 hover:bg-white/8 hover:text-white transition-colors"
                >
                  <item.icon className="h-4 w-4 text-accent-orange" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded-xl bg-white/5 border border-white/8">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}

          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 h-4 min-w-4 px-0.5 rounded-full bg-accent-orange text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#141414] border border-white/10 rounded-xl shadow-2xl z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
                  <h3 className="font-semibold text-sm text-white">Notifications</h3>
                  <button onClick={markAllNotificationsRead} className="text-xs text-accent-orange hover:underline">Mark all read</button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors",
                        !n.read && "bg-accent-orange/8"
                      )}
                    >
                      <p className="text-sm font-medium text-white">{n.title}</p>
                      <p className="text-xs text-white/50 mt-0.5">{n.message}</p>
                      <p className="text-[10px] text-white/30 mt-1">{formatRelative(n.timestamp)}</p>
                    </button>
                  ))}
                </div>
                <Link href="/notifications" onClick={() => setNotifOpen(false)} className="block text-center py-2.5 text-xs text-accent-orange hover:bg-white/5 border-t border-white/8">
                  View all notifications
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="w-px h-8 bg-white/10 hidden sm:block" />

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className={cn(
              "flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl transition-all",
              "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20",
              profileOpen && "bg-white/10 border-accent-orange/40"
            )}
          >
            <Avatar name={user.name} size="sm" />
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
              <p className="text-[10px] text-accent-orange font-medium">{ROLE_LABELS[user.role]}</p>
            </div>
            <ChevronDown className={cn("h-3.5 w-3.5 text-white/40 hidden md:block transition-transform", profileOpen && "rotate-180")} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-[#141414] border border-white/10 rounded-xl shadow-2xl z-50 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-white/8 bg-white/5">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-white/50">{user.email}</p>
              </div>
              <div ref={roleRef} className="px-4 py-2.5 border-b border-white/8">
                <button onClick={() => setRoleOpen(!roleOpen)} className="flex items-center justify-between w-full text-xs text-white/50 hover:text-white">
                  <span>Switch Role (Demo)</span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", roleOpen && "rotate-180")} />
                </button>
                {roleOpen && (
                  <div className="mt-2 space-y-0.5">
                    {(Object.keys(demoUsers) as (keyof typeof demoUsers)[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => switchRole(key)}
                        className={cn(
                          "w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors",
                          user.role === demoUsers[key].role
                            ? "bg-accent-orange/20 text-accent-orange font-semibold"
                            : "text-white/60 hover:bg-white/8 hover:text-white"
                        )}
                      >
                        {ROLE_LABELS[demoUsers[key].role]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {[
                { label: "My Profile", icon: User, href: "/profile" },
                { label: "Settings", icon: Settings, href: "/settings/company" },
              ].map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:bg-white/8 hover:text-white">
                  <item.icon className="h-4 w-4 text-white/40" />
                  {item.label}
                </Link>
              ))}
              <Link href="/login" className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 border-t border-white/8">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
