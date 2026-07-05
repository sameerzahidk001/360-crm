"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#F58220", "#FF9A47", "#22C55E", "#F59E0B", "#EF4444"];

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, children, className }: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function TaskCompletionChart({ data }: { data: { month: string; completed: number; created: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }}
        />
        <Bar dataKey="created" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Created" />
        <Bar dataKey="completed" fill="#F58220" radius={[4, 4, 0, 0]} name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ProjectProgressChart({ data }: { data: { name: string; progress: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" barSize={16}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
        <Bar dataKey="progress" fill="#F58220" radius={[0, 4, 4, 0]} name="Progress %" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TeamWorkloadChart({ data }: { data: { team: string; tasks: number; capacity: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="team" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
        <Bar dataKey="tasks" fill="#F58220" radius={[4, 4, 0, 0]} name="Active Tasks" />
        <Bar dataKey="capacity" fill="#E2E8F0" radius={[4, 4, 0, 0]} name="Capacity" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AttendanceChart({ data }: { data: { day: string; present: number; absent: number; late: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "var(--text-secondary)" }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
        <Line type="monotone" dataKey="present" stroke="#16A34A" strokeWidth={2} dot={false} name="Present" />
        <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2} dot={false} name="Late" />
        <Line type="monotone" dataKey="absent" stroke="#DC2626" strokeWidth={2} dot={false} name="Absent" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function ProjectStatusPie({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: "12px" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
