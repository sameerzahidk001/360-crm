"use client";

import { MessageSquare, Hash, Users } from "lucide-react";
import { PageHeader, KPICard } from "@/components/ui/kpi-card";
import { DiscussionPanel } from "@/components/chat/discussion-panel";
import { useChatStore } from "@/store/chat-store";
import { chatChannels } from "@/data/mock";

export default function DiscussionsPage() {
  const channels = useChatStore((s) => s.channels);
  const totalUnread = channels.reduce((a, c) => a + c.unreadCount, 0);
  const projectChannels = channels.filter((c) => c.type === "project").length;
  const teamChannels = channels.filter((c) => c.type === "team").length;

  return (
    <div className="space-y-5">
      <PageHeader
        title="Discussions"
        description="Team chat, project discussions, and direct messages"
        compact
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KPICard title="Active Channels" value={chatChannels.length} icon={<Hash className="h-5 w-5" />} accent />
        <KPICard title="Unread Messages" value={totalUnread} changeType={totalUnread > 0 ? "negative" : "positive"} icon={<MessageSquare className="h-5 w-5" />} />
        <KPICard title="Project & Team Chats" value={projectChannels + teamChannels} icon={<Users className="h-5 w-5" />} />
      </div>

      <DiscussionPanel />
    </div>
  );
}
