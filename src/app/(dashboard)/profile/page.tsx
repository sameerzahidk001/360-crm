"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { currentUser } from "@/data/mock";
import { ROLE_LABELS } from "@/lib/constants";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="My Profile" description="Manage your personal information" actions={<Button>Save Changes</Button>} />
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar name={currentUser.name} size="lg" />
          <div>
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p className="text-sm text-text-secondary">{ROLE_LABELS[currentUser.role]}</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">Change Photo</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" defaultValue={currentUser.name} />
          <Input label="Email" defaultValue={currentUser.email} />
          <Input label="Phone" defaultValue="+92 300 0000000" />
          <Input label="Department" defaultValue="Management" />
          <Input label="Designation" defaultValue="Company Admin" />
          <Input label="Timezone" defaultValue="Asia/Karachi" />
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm Password" type="password" />
          <Button>Update Password</Button>
        </div>
      </Card>
    </div>
  );
}
