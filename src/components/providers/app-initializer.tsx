"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { ToastContainer } from "@/components/ui/toast";

export function AppInitializer({ children }: { children: React.ReactNode }) {
  const toasts = useAppStore((s) => s.toasts);
  const removeToast = useAppStore((s) => s.removeToast);

  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    const timer = setTimeout(() => removeToast(latest.id), 4000);
    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
