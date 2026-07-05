"use client";

import { useState } from "react";
import { LogIn, LogOut, Clock } from "lucide-react";
import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { attendanceRecords, dashboardKPIs } from "@/data/mock";
import type { AttendanceRecord } from "@/types";

export default function AttendancePage() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  const handleCheckIn = () => {
    setCheckedIn(true);
    setCheckInTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
  };

  const columns = [
    { key: "employee", header: "Employee", render: (r: AttendanceRecord) => <div className="flex items-center gap-2"><Avatar name={r.employeeName} size="sm" /><span>{r.employeeName}</span></div> },
    { key: "checkIn", header: "Check In" },
    { key: "checkOut", header: "Check Out" },
    { key: "workingHours", header: "Hours" },
    { key: "status", header: "Status", render: (r: AttendanceRecord) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Track employee attendance and working hours" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Present Today" value={dashboardKPIs.presentToday} icon={<LogIn className="h-5 w-5" />} accent />
        <KPICard title="Absent Today" value={dashboardKPIs.absentToday} changeType="negative" icon={<LogOut className="h-5 w-5" />} />
        <KPICard title="Late Arrivals" value={2} icon={<Clock className="h-5 w-5" />} />
        <KPICard title="On Leave" value={3} icon={<Clock className="h-5 w-5" />} />
      </div>
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">Your Attendance Today</h3>
            <p className="text-sm text-text-secondary">{checkedIn ? `Checked in at ${checkInTime}` : "Not checked in yet"}</p>
          </div>
          <div className="flex gap-2">
            {!checkedIn ? (
              <Button onClick={handleCheckIn} className="gradient-sidebar-active border-0"><LogIn className="h-4 w-4" /> Check In</Button>
            ) : (
              <Button variant="outline" onClick={() => setCheckedIn(false)}><LogOut className="h-4 w-4" /> Check Out</Button>
            )}
          </div>
        </div>
      </Card>
      <DataTable data={attendanceRecords} columns={columns} searchKey="employeeName" searchPlaceholder="Search employees..." />
    </div>
  );
}
