"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SubmitDailyReportPage() {
  const router = useRouter();
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Submit Daily Report" description="Report your work for today" />
      <Card className="p-6 space-y-4">
        <Input label="Date" type="date" defaultValue="2026-07-04" />
        <Textarea label="Tasks Worked On" placeholder="List tasks you worked on today..." />
        <Textarea label="Work Completed Today" placeholder="Describe what you completed..." />
        <Textarea label="Current Work Status" placeholder="Status of ongoing work..." />
        <Textarea label="Problems / Blockers" placeholder="Any blockers or issues..." />
        <Textarea label="Plans for Tomorrow" placeholder="What you plan to work on tomorrow..." />
        <Input label="Total Hours Worked" type="number" placeholder="8" />
        <Textarea label="Additional Notes" placeholder="Any additional notes..." />
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={() => router.push("/daily-reports")}>Submit Report</Button>
        </div>
      </Card>
    </div>
  );
}
