"use client";

import { Plus, Upload, Folder, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { documents } from "@/data/mock";
import { formatDate } from "@/lib/utils";
import type { Document } from "@/types";

export default function DocumentsPage() {
  const categories = ["All", "Company Documents", "HR Documents", "Project Files", "Client Files", "Employee Documents"];

  const columns = [
    { key: "name", header: "File Name", render: (d: Document) => <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-brand-blue" /><span>{d.name}</span></div> },
    { key: "category", header: "Category" },
    { key: "size", header: "Size" },
    { key: "uploadedBy", header: "Uploaded By" },
    { key: "uploadedAt", header: "Date", render: (d: Document) => formatDate(d.uploadedAt) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Company file management" actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Folder className="h-4 w-4" /> New Folder</Button>
          <Button size="sm"><Upload className="h-4 w-4" /> Upload File</Button>
        </div>
      } />
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <button key={cat} className={`px-3 py-1.5 rounded-xl text-sm ${i === 0 ? "bg-brand-blue text-white" : "bg-surface border border-border text-text-secondary hover:text-text-primary"}`}>{cat}</button>
        ))}
      </div>
      <DataTable data={documents} columns={columns} searchKey="name" searchPlaceholder="Search files..." />
    </div>
  );
}
