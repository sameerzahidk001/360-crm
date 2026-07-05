"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { activities } from "@/data/mock";
import { formatRelative } from "@/lib/utils";
import { Download } from "lucide-react";

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activity Log" description="Track all system activities" actions={<Button variant="outline" size="sm"><Download className="h-4 w-4" /> Export</Button>} />
      <Card className="divide-y divide-border">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-4">
            <Avatar name={activity.userName} size="sm" />
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.userName}</span>{" "}
                <span className="text-text-secondary">{activity.action}</span>{" "}
                <span className="font-medium text-brand-blue">{activity.target}</span>
              </p>
            </div>
            <span className="text-xs text-text-secondary shrink-0">{formatRelative(activity.timestamp)}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
