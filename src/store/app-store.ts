import { create } from "zustand";
import type { User, Task, Notification } from "@/types";
import type { Toast } from "@/types/toast";
import { currentUser as defaultUser } from "@/data/mock";

interface AppState {
  user: User;
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  notifications: Notification[];
  toasts: Toast[];
  selectedTask: Task | null;
  createModalOpen: boolean;
  createModalType: "task" | "project" | "employee" | "client" | null;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setUser: (user: User) => void;
  setSelectedTask: (task: Task | null) => void;
  openCreateModal: (type: "task" | "project" | "employee" | "client") => void;
  closeCreateModal: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: defaultUser,
  sidebarCollapsed: false,
  mobileSidebarOpen: false,
  notifications: [],
  toasts: [],
  selectedTask: null,
  createModalOpen: false,
  createModalType: null,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
  setUser: (user) => set({ user }),
  setSelectedTask: (task) => set({ selectedTask: task }),
  openCreateModal: (type) => set({ createModalOpen: true, createModalType: type }),
  closeCreateModal: () => set({ createModalOpen: false, createModalType: null }),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),
  addToast: (toast) =>
    set((s) => ({
      toasts: [...s.toasts, { ...toast, id: `toast-${Date.now()}` }],
    })),
  removeToast: (id) =>
    set((s) => ({
      toasts: s.toasts.filter((t) => t.id !== id),
    })),
}));
