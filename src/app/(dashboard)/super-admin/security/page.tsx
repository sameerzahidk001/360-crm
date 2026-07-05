"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Key, Smartphone } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Security" description="Platform security settings and policies" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center"><Lock className="h-5 w-5 text-brand-blue" /></div>
            <div><h3 className="font-semibold">Two-Factor Authentication</h3><p className="text-xs text-text-secondary">Require 2FA for admin accounts</p></div>
          </div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked className="rounded" /> Enforce 2FA for Super Admins</label>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center"><Key className="h-5 w-5 text-warning" /></div>
            <div><h3 className="font-semibold">Password Policy</h3><p className="text-xs text-text-secondary">Minimum security requirements</p></div>
          </div>
          <div className="space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded" /> Min 8 characters</label>
            <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded" /> Require special characters</label>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center"><Shield className="h-5 w-5 text-success" /></div>
            <div><h3 className="font-semibold">Session Control</h3><p className="text-xs text-text-secondary">Manage active sessions</p></div>
          </div>
          <Input label="Session Timeout (minutes)" type="number" defaultValue="60" />
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center"><Smartphone className="h-5 w-5 text-brand-cyan" /></div>
            <div><h3 className="font-semibold">Device Management</h3><p className="text-xs text-text-secondary">Track and revoke devices</p></div>
          </div>
          <Button variant="outline" size="sm">View Active Sessions</Button>
        </Card>
      </div>
      <Button>Save Security Settings</Button>
    </div>
  );
}
