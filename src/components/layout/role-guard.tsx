"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/store/app-store";
import type { UserRole } from "@/types";

const routeRoles: { prefix: string; roles: UserRole[] }[] = [
  { prefix: "/super-admin", roles: ["super_admin"] },
  { prefix: "/client", roles: ["client"] },
];

export function RoleGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated } = useAppStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    const rule = routeRoles.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`));
    if (rule && !rule.roles.includes(user.role)) {
      router.replace("/login");
    }
  }, [pathname, user.role, isAuthenticated, router, hydrated]);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-2 border-accent-orange border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const rule = routeRoles.find((r) => pathname === r.prefix || pathname.startsWith(`${r.prefix}/`));
  if (rule && !rule.roles.includes(user.role)) return null;

  return <>{children}</>;
}
