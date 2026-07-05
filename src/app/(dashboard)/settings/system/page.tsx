"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { useAppStore } from "@/store/app-store";

export default function SystemSettingsPage() {
  const addToast = useAppStore((s) => s.addToast);

  const handleSave = () => {
    addToast({ title: "Settings saved", message: "System settings updated successfully.", type: "success" });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="System Settings" description="Configure system-wide preferences" />
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Default Language" options={[{ value: "en", label: "English" }, { value: "ur", label: "Urdu" }, { value: "ar", label: "Arabic" }]} />
          <Select label="Date Format" options={[{ value: "mdy", label: "MM/DD/YYYY" }, { value: "dmy", label: "DD/MM/YYYY" }]} />
          <Select label="Time Format" options={[{ value: "12", label: "12-hour" }, { value: "24", label: "24-hour" }]} />
          <Input label="Items Per Page" type="number" defaultValue="10" />
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Notifications</h3>
        <div className="space-y-2">
          {["Email notifications", "In-app notifications", "Task deadline reminders", "Leave request alerts"].map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm p-2">
              <input type="checkbox" defaultChecked className="rounded" /> {item}
            </label>
          ))}
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Data & Export</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">Export All Data (CSV)</Button>
          <Button variant="outline" size="sm">Export All Data (Excel)</Button>
          <Button variant="outline" size="sm">Generate PDF Report</Button>
        </div>
      </Card>
      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
}
