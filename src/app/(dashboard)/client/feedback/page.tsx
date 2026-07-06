"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";

export default function ClientFeedbackPage() {
  const [project, setProject] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const clientFeedback = useCrmDataStore((s) => s.clientFeedback);
  const addFeedback = useCrmDataStore((s) => s.addFeedback);
  const user = useAppStore((s) => s.user);
  const addToast = useAppStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      addToast({ title: "Please enter your feedback", type: "warning" });
      return;
    }
    addFeedback({
      projectId: "p1",
      author: user.name,
      message: message.trim(),
      rating,
      date: new Date().toISOString().split("T")[0],
    });
    addToast({ title: "Feedback submitted", message: "Thank you for your feedback!", type: "success" });
    setProject("");
    setMessage("");
    setRating(5);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Project Feedback" description="Share your thoughts on project progress" />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Project" placeholder="e.g. 360 WorkFlow Platform" value={project} onChange={(e) => setProject(e.target.value)} />
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} className="p-1">
                  <Star className={`h-6 w-6 ${n <= rating ? "text-warning fill-warning" : "text-border"}`} />
                </button>
              ))}
            </div>
          </div>
          <Textarea label="Your Feedback" placeholder="Share your thoughts..." value={message} onChange={(e) => setMessage(e.target.value)} required />
          <Button type="submit">Submit Feedback</Button>
        </form>
      </Card>
      <div className="space-y-3">
        <h3 className="font-semibold">Previous Feedback ({clientFeedback.length})</h3>
        {clientFeedback.map((fb) => (
          <Card key={fb.id} className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: fb.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-warning fill-warning" />
              ))}
            </div>
            <p className="text-sm">{fb.message}</p>
            <p className="text-xs text-text-secondary mt-2">{fb.author} · {fb.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
