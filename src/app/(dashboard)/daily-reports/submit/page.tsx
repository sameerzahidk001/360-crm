"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";

export default function SubmitDailyReportPage() {
  const router = useRouter();
  const user = useAppStore((s) => s.user);
  const addToast = useAppStore((s) => s.addToast);
  const addDailyReport = useCrmDataStore((s) => s.addDailyReport);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tasksWorkedOn, setTasksWorkedOn] = useState("");
  const [workCompleted, setWorkCompleted] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [blockers, setBlockers] = useState("");
  const [plansForTomorrow, setPlansForTomorrow] = useState("");
  const [totalHours, setTotalHours] = useState("8");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!tasksWorkedOn.trim() || !workCompleted.trim()) {
      addToast({ title: "Fill required fields", message: "Tasks and work completed are required", type: "warning" });
      return;
    }
    addDailyReport({
      employeeId: user.id,
      employeeName: user.name,
      date,
      tasksWorkedOn: tasksWorkedOn.trim(),
      workCompleted: workCompleted.trim(),
      currentStatus: currentStatus.trim() || "In progress",
      blockers: blockers.trim() || "None",
      plansForTomorrow: plansForTomorrow.trim() || "Continue current tasks",
      totalHours: parseFloat(totalHours) || 8,
      status: "submitted",
    });
    addToast({ title: "Daily report submitted", type: "success" });
    router.push("/daily-reports");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Submit Daily Report" description="Report your work for today" />
      <Card className="p-6 space-y-4">
        <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Textarea label="Tasks Worked On" placeholder="List tasks you worked on today..." value={tasksWorkedOn} onChange={(e) => setTasksWorkedOn(e.target.value)} required />
        <Textarea label="Work Completed Today" placeholder="Describe what you completed..." value={workCompleted} onChange={(e) => setWorkCompleted(e.target.value)} required />
        <Textarea label="Current Work Status" placeholder="Status of ongoing work..." value={currentStatus} onChange={(e) => setCurrentStatus(e.target.value)} />
        <Textarea label="Problems / Blockers" placeholder="Any blockers or issues..." value={blockers} onChange={(e) => setBlockers(e.target.value)} />
        <Textarea label="Plans for Tomorrow" placeholder="What you plan to work on tomorrow..." value={plansForTomorrow} onChange={(e) => setPlansForTomorrow(e.target.value)} />
        <Input label="Total Hours Worked" type="number" placeholder="8" value={totalHours} onChange={(e) => setTotalHours(e.target.value)} />
        <Textarea label="Additional Notes" placeholder="Any additional notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="button" onClick={handleSubmit}>Submit Report</Button>
        </div>
      </Card>
    </div>
  );
}
