"use client";

import { X, MessageSquare, Paperclip, Clock, Calendar } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { StatusBadge, PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function TaskDetailPanel() {
  const { selectedTask, setSelectedTask } = useAppStore();

  if (!selectedTask) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={() => setSelectedTask(null)} />
      <div className="relative w-full max-w-lg bg-surface border-l border-border shadow-2xl animate-slide-in-right overflow-y-auto scrollbar-thin">
        <div className="sticky top-0 bg-surface z-10 flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary pr-4">{selectedTask.title}</h2>
          <button onClick={() => setSelectedTask(null)} className="p-1.5 rounded-lg hover:bg-bg-main text-text-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={selectedTask.status} />
            <PriorityBadge priority={selectedTask.priority} />
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase mb-2">Description</h4>
            <p className="text-sm text-text-primary leading-relaxed">{selectedTask.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase mb-2">Project</h4>
              <p className="text-sm text-text-primary">{selectedTask.projectName}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase mb-2">Assignee</h4>
              <div className="flex items-center gap-2">
                {selectedTask.assigneeNames.map((name) => (
                  <div key={name} className="flex items-center gap-1.5">
                    <Avatar name={name} size="sm" />
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-text-secondary" />
              <div>
                <p className="text-xs text-text-secondary">Due Date</p>
                <p className="text-sm font-medium">{formatDate(selectedTask.dueDate)}</p>
              </div>
            </div>
            {selectedTask.estimatedHours && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-text-secondary" />
                <div>
                  <p className="text-xs text-text-secondary">Estimated</p>
                  <p className="text-sm font-medium">{selectedTask.estimatedHours}h</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold text-text-secondary uppercase mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {["todo", "in_progress", "in_review", "completed"].map((s) => (
                <button
                  key={s}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                    selectedTask.status === s
                      ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                      : "border-border text-text-secondary hover:border-brand-blue/30"
                  )}
                >
                  {s.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-text-secondary uppercase">Comments</h4>
              <span className="text-xs text-text-secondary flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {selectedTask.commentCount || 0}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Avatar name="Ahmed Raza" size="sm" />
                <div className="flex-1 bg-bg-main rounded-xl p-3">
                  <p className="text-xs font-medium">Ahmed Raza</p>
                  <p className="text-sm text-text-secondary mt-1">Started working on the JWT integration. Should be done by EOD.</p>
                  <p className="text-[10px] text-text-secondary/60 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <input
                placeholder="Add a comment..."
                className="flex-1 h-9 px-3 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20"
              />
              <Button size="sm">Send</Button>
            </div>
          </div>

          {(selectedTask.attachmentCount ?? 0) > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-text-secondary uppercase mb-2 flex items-center gap-1">
                <Paperclip className="h-3.5 w-3.5" />
                Attachments ({selectedTask.attachmentCount})
              </h4>
              <div className="flex items-center gap-2 p-3 rounded-xl border border-border hover:bg-bg-main cursor-pointer">
                <Paperclip className="h-4 w-4 text-brand-blue" />
                <span className="text-sm">auth-flow-diagram.pdf</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
