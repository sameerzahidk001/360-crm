"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";
import type { EmploymentType } from "@/types";

export default function AddEmployeePage() {
  const router = useRouter();
  const addToast = useAppStore((s) => s.addToast);
  const { departments, teams, addEmployee } = useCrmDataStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [designation, setDesignation] = useState("");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("full_time");
  const [joiningDate, setJoiningDate] = useState(new Date().toISOString().split("T")[0]);
  const [workingHours, setWorkingHours] = useState("9:00 AM - 6:00 PM");
  const [address, setAddress] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !email.trim() || !departmentId || !designation.trim()) {
      addToast({ title: "Fill required fields", message: "Name, email, department, and designation are required", type: "warning" });
      return;
    }
    const dept = departments.find((d) => d.id === departmentId);
    const team = teams.find((t) => t.id === teamId);
    const employee = addEmployee({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || "+92 300 0000000",
      employeeId: employeeId.trim() || undefined,
      departmentId,
      departmentName: dept?.name ?? "General",
      designation: designation.trim(),
      teamId: teamId || undefined,
      teamName: team?.name,
      joiningDate,
      employmentType,
      workingHours: workingHours.trim() || "9:00 AM - 6:00 PM",
      status: "active",
      address: address.trim() || undefined,
    });
    addToast({ title: "Employee added", message: employee.name, type: "success" });
    router.push("/employees");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Add Employee" description="Add a new employee to the company" />
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Full Name" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email" type="email" placeholder="employee@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Phone" placeholder="+92 300 0000000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input label="Employee ID" placeholder="EMP-000 (auto if empty)" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
          <Select label="Department" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} options={[{ value: "", label: "Select" }, ...departments.map((d) => ({ value: d.id, label: d.name }))]} />
          <Select label="Team" value={teamId} onChange={(e) => setTeamId(e.target.value)} options={[{ value: "", label: "Select" }, ...teams.map((t) => ({ value: t.id, label: t.name }))]} />
          <Input label="Designation" placeholder="e.g. Senior Developer" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
          <Select label="Employment Type" value={employmentType} onChange={(e) => setEmploymentType(e.target.value as EmploymentType)} options={[
            { value: "full_time", label: "Full Time" },
            { value: "part_time", label: "Part Time" },
            { value: "contract", label: "Contract" },
            { value: "intern", label: "Intern" },
          ]} />
          <Input label="Joining Date" type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
          <Input label="Working Hours" placeholder="9:00 AM - 6:00 PM" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} />
          <div className="md:col-span-2">
            <Input label="Address" placeholder="Employee address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="button" onClick={handleAdd}>Add Employee</Button>
        </div>
      </Card>
    </div>
  );
}
