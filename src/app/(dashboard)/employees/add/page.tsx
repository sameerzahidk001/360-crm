"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { departments, teams } from "@/data/mock";

export default function AddEmployeePage() {
  const router = useRouter();

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Add Employee" description="Add a new employee to the company" />
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="Email" type="email" placeholder="employee@company.com" />
          <Input label="Phone" placeholder="+92 300 0000000" />
          <Input label="Employee ID" placeholder="EMP-000" />
          <Select label="Department" options={[{ value: "", label: "Select" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
          <Select label="Team" options={[{ value: "", label: "Select" }, ...teams.map((t) => ({ value: t.id, label: t.name }))]} />
          <Input label="Designation" placeholder="e.g. Senior Developer" />
          <Select label="Employment Type" options={[
            { value: "full_time", label: "Full Time" },
            { value: "part_time", label: "Part Time" },
            { value: "contract", label: "Contract" },
            { value: "intern", label: "Intern" },
          ]} />
          <Input label="Joining Date" type="date" />
          <Input label="Working Hours" placeholder="9:00 AM - 6:00 PM" />
          <div className="md:col-span-2">
            <Input label="Address" placeholder="Employee address" />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={() => router.push("/employees")}>Add Employee</Button>
        </div>
      </Card>
    </div>
  );
}
