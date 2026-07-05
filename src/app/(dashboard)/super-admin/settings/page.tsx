"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

export default function PlatformSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Platform Settings" description="Global platform configuration and branding" />
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Branding</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Platform Name" defaultValue="360 WorkFlow" />
          <Input label="Support Email" defaultValue="support@360tech.com" />
          <Input label="Primary Color" defaultValue="#2563EB" />
          <Input label="Accent Color" defaultValue="#06B6D4" />
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Modules</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {["Tasks", "Projects", "Attendance", "Leave", "Time Tracking", "Client Portal", "Reports", "Documents"].map((mod) => (
            <label key={mod} className="flex items-center gap-2 p-3 rounded-xl border border-border text-sm">
              <input type="checkbox" defaultChecked className="rounded" /> {mod}
            </label>
          ))}
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Backups</h3>
        <p className="text-sm text-text-secondary">Last backup: July 4, 2026 at 2:00 AM</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Run Backup Now</Button>
          <Select label="Backup Frequency" options={[{ value: "daily", label: "Daily" }, { value: "weekly", label: "Weekly" }]} />
        </div>
      </Card>
      <Button>Save Settings</Button>
    </div>
  );
}
