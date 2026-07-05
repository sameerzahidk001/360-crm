"use client";

import { useState } from "react";
import { Plus, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { announcements } from "@/data/mock";
import { formatDate } from "@/lib/utils";

export default function AnnouncementsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const priorityVariant = (p: string) => p === "urgent" ? "danger" as const : p === "important" ? "warning" as const : "info" as const;

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Company-wide announcements and updates" actions={<Button size="sm" onClick={() => setModalOpen(true)}><Plus className="h-4 w-4" /> Create Announcement</Button>} />
      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue"><Megaphone className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{ann.title}</h3>
                    <Badge variant={priorityVariant(ann.priority)}>{ann.priority}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{ann.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary">
                    <span>By {ann.authorName}</span>
                    <span>{formatDate(ann.publishDate)}</span>
                    <span>Audience: {ann.audience}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create Announcement" footer={<><Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button><Button onClick={() => setModalOpen(false)}>Publish</Button></>}>
        <div className="space-y-4">
          <Input label="Title" placeholder="Announcement title" />
          <Textarea label="Message" placeholder="Write your announcement..." />
          <Select label="Audience" options={[{ value: "all", label: "All Employees" }, { value: "department", label: "Department" }, { value: "team", label: "Team" }]} />
          <Select label="Priority" options={[{ value: "normal", label: "Normal" }, { value: "important", label: "Important" }, { value: "urgent", label: "Urgent" }]} />
        </div>
      </Modal>
    </div>
  );
}
