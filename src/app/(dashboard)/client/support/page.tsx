"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { StatusBadge } from "@/components/ui/badge";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";

export default function ClientSupportPage() {
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("normal");
  const [description, setDescription] = useState("");
  const supportRequests = useCrmDataStore((s) => s.supportRequests);
  const addSupportRequest = useCrmDataStore((s) => s.addSupportRequest);
  const addToast = useAppStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      addToast({ title: "Fill all required fields", type: "warning" });
      return;
    }
    addSupportRequest({
      subject: subject.trim(),
      status: "open",
      priority,
      createdAt: new Date().toISOString().split("T")[0],
    });
    addToast({ title: "Support request created", message: "We'll get back to you within 24 hours.", type: "success" });
    setSubject("");
    setDescription("");
    setPriority("normal");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Support Requests" description="Get help with your projects" />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Subject" placeholder="Brief description of your issue" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            options={[{ value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }]}
          />
          <Textarea label="Description" placeholder="Describe your issue in detail..." value={description} onChange={(e) => setDescription(e.target.value)} required />
          <Button type="submit">Submit Request</Button>
        </form>
      </Card>
      <div className="space-y-3">
        <h3 className="font-semibold">Your Requests ({supportRequests.length})</h3>
        {supportRequests.map((req) => (
          <Card key={req.id} className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-sm">{req.subject}</p>
              <p className="text-xs text-text-secondary">{req.createdAt} · {req.priority} priority</p>
            </div>
            <StatusBadge status={req.status === "resolved" ? "completed" : "pending"} />
          </Card>
        ))}
      </div>
    </div>
  );
}
