"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/kpi-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";
import { Input, Select } from "@/components/ui/input";
import { useCrmDataStore } from "@/store/crm-data-store";
import { useAppStore } from "@/store/app-store";
import { departments as mockDepartments } from "@/data/mock";

export default function TeamsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const teams = useCrmDataStore((s) => s.teams);
  const addTeam = useCrmDataStore((s) => s.addTeam);
  const addToast = useAppStore((s) => s.addToast);

  const handleCreate = () => {
    if (!name.trim() || !departmentId || !leaderName.trim()) {
      addToast({ title: "Fill all fields", type: "warning" });
      return;
    }
    const dept = mockDepartments.find((d) => d.id === departmentId);
    addTeam({
      name: name.trim(),
      departmentId,
      departmentName: dept?.name ?? "Unknown",
      leaderId: `e-${Date.now()}`,
      leaderName: leaderName.trim(),
      memberCount: 1,
      activeProjects: 0,
    });
    addToast({ title: "Team created", message: name.trim(), type: "success" });
    setName("");
      setDepartmentId("");
      setLeaderName("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Teams"
        description="Manage teams across departments"
        actions={
          <Button type="button" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" /> Create Team
          </Button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teams.map((team) => (
          <Card key={team.id} className="p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{team.name}</h3>
                <p className="text-sm text-text-secondary">{team.departmentName}</p>
              </div>
              <span className="text-xs bg-accent-orange/10 text-accent-orange px-2 py-1 rounded-full">{team.activeProjects} projects</span>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Avatar name={team.leaderName} size="sm" />
              <div>
                <p className="text-sm font-medium">{team.leaderName}</p>
                <p className="text-xs text-text-secondary">Team Lead</p>
              </div>
            </div>
            <p className="text-sm text-text-secondary mt-3">{team.memberCount} members</p>
          </Card>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Team"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleCreate}>Create Team</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Team Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Frontend Team" required />
          <Select
            label="Department"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            options={[{ value: "", label: "Select department" }, ...mockDepartments.map((d) => ({ value: d.id, label: d.name }))]}
          />
          <Input label="Team Lead" value={leaderName} onChange={(e) => setLeaderName(e.target.value)} placeholder="Leader name" required />
        </div>
      </Modal>
    </div>
  );
}
