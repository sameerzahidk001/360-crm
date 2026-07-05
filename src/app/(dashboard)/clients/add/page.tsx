"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function AddClientPage() {
  const router = useRouter();
  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Add Client" description="Add a new client to the system" />
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Contact Name" placeholder="John Smith" />
          <Input label="Company Name" placeholder="TechCorp Inc." />
          <Input label="Email" type="email" />
          <Input label="Phone" />
          <Input label="Country" />
          <Select label="Status" options={[{ value: "active", label: "Active" }, { value: "lead", label: "Lead" }, { value: "on_hold", label: "On Hold" }]} />
          <div className="md:col-span-2"><Textarea label="Address" /></div>
          <div className="md:col-span-2"><Textarea label="Notes" /></div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={() => router.push("/clients")}>Add Client</Button>
        </div>
      </Card>
    </div>
  );
}
