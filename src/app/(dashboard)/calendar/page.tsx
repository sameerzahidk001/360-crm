"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tasks, leaveRequests, announcements } from "@/data/mock";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function CalendarPage() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentMonth] = useState(6);
  const [currentYear] = useState(2026);

  const events = [
    ...tasks.map((t) => ({ date: t.dueDate, title: t.title, type: "task" as const, color: "bg-brand-blue" })),
    ...leaveRequests.filter((l) => l.status === "approved").map((l) => ({ date: l.startDate, title: `${l.employeeName} - Leave`, type: "leave" as const, color: "bg-warning" })),
    ...announcements.map((a) => ({ date: a.publishDate, title: a.title, type: "event" as const, color: "bg-brand-cyan" })),
  ];

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  return (
    <div className="space-y-6">
      <PageHeader title="Company Calendar" description="View deadlines, leaves, and events" actions={
        <div className="flex items-center gap-2">
          <div className="flex bg-surface border border-border rounded-xl p-1">
            {(["month", "week", "day"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={cn("px-3 py-1.5 rounded-lg text-sm capitalize", view === v ? "bg-brand-blue text-white" : "text-text-secondary")}>{v}</button>
            ))}
          </div>
          <Button size="sm">Add Event</Button>
        </div>
      } />

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm"><ChevronLeft className="h-4 w-4" /></Button>
          <h2 className="text-lg font-semibold">{MONTHS[currentMonth]} {currentYear}</h2>
          <Button variant="ghost" size="sm"><ChevronRight className="h-4 w-4" /></Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((d) => <div key={d} className="text-center text-xs font-semibold text-text-secondary py-2">{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} className="min-h-[80px]" />)}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvents = events.filter((e) => e.date === dateStr);
            const isToday = day === 4 && currentMonth === 6;
            return (
              <div key={day} className={cn("min-h-[80px] p-1.5 rounded-xl border border-border/50", isToday && "border-brand-blue bg-brand-blue/5")}>
                <p className={cn("text-xs font-medium mb-1", isToday ? "text-brand-blue" : "text-text-secondary")}>{day}</p>
                {dayEvents.slice(0, 2).map((e, idx) => (
                  <div key={idx} className={cn("text-[10px] text-white px-1.5 py-0.5 rounded mb-0.5 truncate", e.color)}>{e.title}</div>
                ))}
                {dayEvents.length > 2 && <p className="text-[10px] text-text-secondary">+{dayEvents.length - 2} more</p>}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex flex-wrap gap-4 text-xs">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-brand-blue" /> Tasks</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-warning" /> Leave</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded bg-brand-cyan" /> Events</span>
      </div>
    </div>
  );
}
