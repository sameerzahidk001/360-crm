"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";
import type { ClientStatus } from "@/types";

export default function AddClientPage() {
  const router = useRouter();
  const addToast = useAppStore((s) => s.addToast);
  const addClient = useCrmDataStore((s) => s.addClient);
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState<ClientStatus>("active");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !companyName.trim() || !email.trim()) {
      addToast({ title: "Fill required fields", message: "Contact name, company, and email are required", type: "warning" });
      return;
    }
    const client = addClient({
      name: name.trim(),
      companyName: companyName.trim(),
      email: email.trim(),
      phone: phone.trim() || "—",
      country: country.trim() || "—",
      status,
      address: address.trim() || notes.trim() || undefined,
      projectCount: 0,
    });
    addToast({ title: "Client added", message: client.companyName, type: "success" });
    router.push("/clients");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title="Add Client" description="Add a new client to the system" />
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Contact Name" placeholder="John Smith" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Company Name" placeholder="TechCorp Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as ClientStatus)} options={[{ value: "active", label: "Active" }, { value: "lead", label: "Lead" }, { value: "on_hold", label: "On Hold" }]} />
          <div className="md:col-span-2"><Textarea label="Address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
          <div className="md:col-span-2"><Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="button" onClick={handleAdd}>Add Client</Button>
        </div>
      </Card>
    </div>
  );
}
