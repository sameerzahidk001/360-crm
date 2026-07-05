"use client";

import { useState, useEffect } from "react";
import { Play, Square, Plus, Pause } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { useTaskStore } from "@/store/task-store";
import { useTimerStore, formatDuration } from "@/store/timer-store";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

export default function TimeTrackingPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const user = useAppStore((s) => s.user);
  const addToast = useAppStore((s) => s.addToast);
  const { isRunning, selectedTaskId, timeLogs, start, stop, pause, getElapsedMs } = useTimerStore();
  const [selectedTask, setSelectedTask] = useState(selectedTaskId ?? "");
  const [display, setDisplay] = useState("00:00:00");

  useEffect(() => {
    if (selectedTaskId) setSelectedTask(selectedTaskId);
  }, [selectedTaskId]);

  useEffect(() => {
    const tick = () => setDisplay(formatDuration(getElapsedMs()));
    tick();
    if (!isRunning) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [isRunning, getElapsedMs]);

  const activeTasks = tasks.filter((t) => t.status !== "completed");
  const selectedTaskObj = tasks.find((t) => t.id === selectedTask);

  const handleStart = () => {
    if (!selectedTask) {
      addToast({ title: "Select a task first", type: "warning" });
      return;
    }
    start(selectedTask);
    addToast({ title: "Timer started", message: selectedTaskObj?.title, type: "info" });
  };

  const handleStop = () => {
    if (!selectedTaskObj) return;
    const log = stop(user.name, selectedTaskObj.title);
    if (log) {
      addToast({ title: "Time logged", message: `${log.duration} on ${log.task}`, type: "success" });
      setDisplay("00:00:00");
    }
  };

  const columns = [
    { key: "employee", header: "Employee" },
    { key: "task", header: "Task", className: "max-w-[220px]" },
    { key: "start", header: "Start" },
    { key: "end", header: "End" },
    { key: "duration", header: "Duration" },
    { key: "notes", header: "Notes" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Time Tracking" description="Track time spent on tasks" />
      <Card className={cn("p-6 border-2 transition-colors", isRunning ? "border-brand-blue/40 gradient-card-accent" : "")}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-text-secondary">Current Timer</p>
            <p className={cn("text-5xl font-bold font-mono mt-1 tabular-nums", isRunning ? "text-brand-blue" : "text-text-primary")}>
              {display}
            </p>
            {isRunning && (
              <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-medium text-success">
                <span className="h-2 w-2 rounded-full bg-success animate-pulse" /> Recording
              </span>
            )}
            <select
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
              disabled={isRunning}
              className="mt-4 h-10 px-3 rounded-xl border border-border bg-surface text-sm w-full md:w-80"
            >
              <option value="">Select a task...</option>
              {activeTasks.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {!isRunning ? (
              <Button size="lg" onClick={handleStart} className="btn-primary"><Play className="h-5 w-5" /> Start</Button>
            ) : (
              <>
                <Button size="lg" variant="outline" onClick={pause}><Pause className="h-5 w-5" /> Pause</Button>
                <Button size="lg" variant="danger" onClick={handleStop}><Square className="h-5 w-5" /> Stop & Log</Button>
              </>
            )}
            <Button size="lg" variant="outline"><Plus className="h-5 w-5" /> Manual Entry</Button>
          </div>
        </div>
      </Card>
      <DataTable data={timeLogs} columns={columns} searchKey="employee" searchPlaceholder="Search logs..." />
    </div>
  );
}
