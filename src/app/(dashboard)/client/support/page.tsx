"use client";

import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/badge";
import { supportRequests } from "@/data/mock";
import { useAppStore } from "@/store/app-store";

export default function ClientSupportPage() {
  const addToast = useAppStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: "Support request created", message: "We'll get back to you within 24 hours.", type: "success" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Support Requests" description="Get help with your projects" />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Subject" placeholder="Brief description of your issue" required />
          <Select label="Priority" options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }]} />
          <Textarea label="Description" placeholder="Describe your issue in detail..." required />
          <Button type="submit">Submit Request</Button>
        </form>
      </Card>
      <div className="space-y-3">
        <h3 className="font-semibold">Your Requests</h3>
        {supportRequests.map((req) => (
          <Card key={req.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{req.subject}</p>
              <p className="text-xs text-text-secondary">{req.createdAt}</p>
            </div>
            <StatusBadge status={req.status === "resolved" ? "completed" : "pending"} />
          </Card>
        ))}
      </div>
    </div>
  );
}
