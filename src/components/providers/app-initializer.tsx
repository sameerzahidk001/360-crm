"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { notifications as mockNotifications } from "@/data/mock";

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const setState = useAppStore.setState;
  const toasts = useAppStore((s) => s.toasts);
  const removeToast = useAppStore((s) => s.removeToast);

  useEffect(() => {
    setState({ notifications: mockNotifications });
  }, [setState]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => removeToast(latest.id), 4000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return <>{children}</>;
}
