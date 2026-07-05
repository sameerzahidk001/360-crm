"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";

export default function CompanySettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Company Settings" description="Configure company preferences" actions={<Button>Save Changes</Button>} />
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Company Name" defaultValue="360 Tech Solution" />
          <Input label="Company Email" defaultValue="info@360tech.com" />
          <Input label="Phone" defaultValue="+92 42 1234567" />
          <Input label="Website" defaultValue="https://360tech.com" />
          <Select label="Timezone" options={[{ value: "Asia/Karachi", label: "Asia/Karachi (PKT)" }, { value: "UTC", label: "UTC" }]} />
          <Input label="Working Hours" defaultValue="9:00 AM - 6:00 PM" />
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Attendance Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Office Start Time" defaultValue="09:00" type="time" />
          <Input label="Office End Time" defaultValue="18:00" type="time" />
          <Input label="Late Arrival Grace (minutes)" defaultValue="15" type="number" />
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Notification Settings</h3>
        <div className="space-y-3">
          {["Email Notifications", "In-App Notifications", "Task Deadline Reminders", "Leave Request Alerts"].map((setting) => (
            <label key={setting} className="flex items-center justify-between">
              <span className="text-sm">{setting}</span>
              <input type="checkbox" defaultChecked className="rounded border-border" />
            </label>
          ))}
        </div>
      </Card>
      <Card className="p-6 space-y-4">
        <h3 className="font-semibold">Security</h3>
        <div className="space-y-3">
          {["Two-Factor Authentication", "Session Timeout (30 min)", "Password Policy Enforcement"].map((setting) => (
            <label key={setting} className="flex items-center justify-between">
              <span className="text-sm">{setting}</span>
              <input type="checkbox" defaultChecked={setting.includes("Password")} className="rounded border-border" />
            </label>
          ))}
        </div>
      </Card>
    </div>
  );
}
