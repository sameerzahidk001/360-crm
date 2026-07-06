"use client";

import { useState } from "react";
import { Plus, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input, Textarea, Select } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";
import { formatDate } from "@/lib/utils";
import type { AnnouncementPriority } from "@/types";

export default function AnnouncementsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Employees");
  const [priority, setPriority] = useState<AnnouncementPriority>("normal");
  const announcements = useCrmDataStore((s) => s.announcements);
  const addAnnouncement = useCrmDataStore((s) => s.addAnnouncement);
  const user = useAppStore((s) => s.user);
  const addToast = useAppStore((s) => s.addToast);

  const priorityVariant = (p: string) => p === "urgent" ? "danger" as const : p === "important" ? "warning" as const : "info" as const;

  const handlePublish = () => {
    if (!title.trim() || !message.trim()) {
      addToast({ title: "Fill required fields", message: "Title and message are required", type: "warning" });
      return;
    }
    addAnnouncement({
      title: title.trim(),
      message: message.trim(),
      audience,
      publishDate: new Date().toISOString().split("T")[0],
      priority,
      authorName: user.name,
    });
    addToast({ title: "Announcement published", type: "success" });
    setTitle("");
    setMessage("");
    setAudience("All Employees");
    setPriority("normal");
    setModalOpen(false);
  };

  const createButton = (
    <Button type="button" size="sm" onClick={() => setModalOpen(true)}>
      <Plus className="h-4 w-4" /> Create Announcement
    </Button>
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Announcements" description="Company-wide announcements and updates" actions={createButton} />

      <div className="flex justify-end sm:hidden">{createButton}</div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-accent-orange/10 text-accent-orange"><Megaphone className="h-5 w-5" /></div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold">{ann.title}</h3>
                    <Badge variant={priorityVariant(ann.priority)}>{ann.priority}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{ann.message}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-text-secondary flex-wrap">
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

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Announcement"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handlePublish}>Publish</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Title" placeholder="Announcement title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Message" placeholder="Write your announcement..." value={message} onChange={(e) => setMessage(e.target.value)} required />
          <Select
            label="Audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            options={[
              { value: "All Employees", label: "All Employees" },
              { value: "Development", label: "Development" },
              { value: "HR", label: "HR" },
              { value: "Management", label: "Management" },
            ]}
          />
          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
            options={[
              { value: "normal", label: "Normal" },
              { value: "important", label: "Important" },
              { value: "urgent", label: "Urgent" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}
