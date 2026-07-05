"use client";

import { Star } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { clientFeedback } from "@/data/mock";
import { useAppStore } from "@/store/app-store";

export default function ClientFeedbackPage() {
  const addToast = useAppStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({ title: "Feedback submitted", message: "Thank you for your feedback!", type: "success" });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Project Feedback" description="Share your thoughts on project progress" />
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Project" placeholder="Select project" />
          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" className="p-1"><Star className="h-6 w-6 text-warning fill-warning" /></button>
              ))}
            </div>
          </div>
          <Textarea label="Your Feedback" placeholder="Share your thoughts..." />
          <Button type="submit">Submit Feedback</Button>
        </form>
      </Card>
      <div className="space-y-3">
        <h3 className="font-semibold">Previous Feedback</h3>
        {clientFeedback.map((fb) => (
          <Card key={fb.id} className="p-4">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: fb.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-warning fill-warning" />
              ))}
            </div>
            <p className="text-sm">{fb.message}</p>
            <p className="text-xs text-text-secondary mt-2">{fb.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
