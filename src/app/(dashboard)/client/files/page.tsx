"use client";

import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { documents } from "@/data/mock";

const clientFiles = documents.filter((d) => d.category === "Project Files" || d.category === "Client Files");

export default function ClientFilesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Project Files" description="Download approved project documents" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {clientFiles.map((doc) => (
          <Card key={doc.id} className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-brand-blue" />
              </div>
              <div>
                <p className="text-sm font-medium">{doc.name}</p>
                <p className="text-xs text-text-secondary">{doc.size} • {doc.uploadedBy}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm"><Download className="h-4 w-4" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
