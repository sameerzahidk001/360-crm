"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/app-store";
import { formatRelative, cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppStore();

  return (
    <div className="space-y-6">
      <PageHeader title="Notifications" description="All your notifications" actions={<Button variant="outline" size="sm" onClick={markAllNotificationsRead}>Mark all as read</Button>} />
      <div className="space-y-2">
        {notifications.map((n) => (
          <Card
            key={n.id}
            className={cn("p-4 cursor-pointer hover:shadow-sm transition-all", !n.read && "border-brand-blue/30 bg-brand-blue/5")}
            onClick={() => markNotificationRead(n.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-sm">{n.title}</p>
                <p className="text-sm text-text-secondary mt-0.5">{n.message}</p>
                <p className="text-xs text-text-secondary/60 mt-2">{formatRelative(n.timestamp)}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-brand-blue shrink-0 mt-2" />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
