"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { useCrmDataStore } from "@/store/crm-data-store";

export default function ClientProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const clients = useCrmDataStore((s) => s.clients);
  const projects = useCrmDataStore((s) => s.projects);
  const client = clients.find((c) => c.id === id);
  const clientProjects = projects.filter((p) => p.clientId === id);

  if (!client) return <div className="text-center py-20 text-text-secondary">Client not found</div>;

  return (
    <div className="space-y-6">
      <Link href="/clients" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">{client.companyName}</h1>
        <StatusBadge status={client.status} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-text-secondary">Contact</span><span>{client.name}</span></div>
          <div className="flex justify-between"><span className="text-text-secondary">Email</span><span>{client.email}</span></div>
          <div className="flex justify-between"><span className="text-text-secondary">Phone</span><span>{client.phone}</span></div>
          <div className="flex justify-between"><span className="text-text-secondary">Country</span><span>{client.country}</span></div>
          <div className="flex justify-between"><span className="text-text-secondary">Account Manager</span><span>{client.accountManagerName}</span></div>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <CardHeader><CardTitle>Projects ({clientProjects.length})</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {clientProjects.map((p) => (
                <Link key={p.id} href={`/projects/${p.id}`} className="block p-4 rounded-xl border border-border hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{p.title}</p>
                    <StatusBadge status={p.status} />
                  </div>
                  <ProgressBar value={p.progress} showLabel />
                </Link>
              ))}
              {clientProjects.length === 0 && <p className="text-sm text-text-secondary">No projects yet</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
