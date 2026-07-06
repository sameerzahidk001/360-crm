"use client";

import { useRef, useEffect, useState } from "react";
import {
  Hash, Users, FolderOpen, Building, MessageCircle, Send, Paperclip,
  Smile, Search, Plus, MoreVertical,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useChatStore } from "@/store/chat-store";
import { useAppStore } from "@/store/app-store";
import { formatRelative, cn } from "@/lib/utils";
import type { ChatChannel, ChatChannelType } from "@/types";

const channelIcons: Record<ChatChannelType, React.ElementType> = {
  general: Hash,
  team: Users,
  project: FolderOpen,
  department: Building,
  direct: MessageCircle,
};

const channelGroups: { label: string; types: ChatChannelType[] }[] = [
  { label: "General", types: ["general"] },
  { label: "Projects", types: ["project"] },
  { label: "Teams", types: ["team"] },
  { label: "Departments", types: ["department"] },
  { label: "Direct Messages", types: ["direct"] },
];

function ChannelItem({ channel, active, onClick }: { channel: ChatChannel; active: boolean; onClick: () => void }) {
  const Icon = channelIcons[channel.type];
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all text-left",
        active
          ? "bg-accent-orange text-white font-medium"
          : "text-text-secondary hover:bg-bg-main hover:text-text-primary"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate">{channel.type === "direct" ? channel.name : `# ${channel.name}`}</span>
      {channel.unreadCount > 0 && (
        <span className={cn(
          "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
          active ? "bg-white/20 text-white" : "bg-accent-orange text-white"
        )}>
          {channel.unreadCount}
        </span>
      )}
    </button>
  );
}

export function DiscussionPanel() {
  const user = useAppStore((s) => s.user);
  const addToast = useAppStore((s) => s.addToast);
  const { channels, messages, activeChannelId, setActiveChannel, sendMessage } = useChatStore();
  const [input, setInput] = useState("");
  const [channelSearch, setChannelSearch] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find((c) => c.id === activeChannelId);
  const channelMessages = messages
    .filter((m) => m.channelId === activeChannelId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  const filteredChannels = channels.filter((c) =>
    c.name.toLowerCase().includes(channelSearch.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages.length, activeChannelId]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || !activeChannelId) return;
    sendMessage(activeChannelId, user.id, user.name, text);
    setInput("");
    addToast({ title: "Message sent", type: "success" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-8.5rem)] min-h-[520px] rounded-2xl border border-border bg-surface overflow-hidden shadow-sm">
      {/* Mobile channel picker */}
      <div className="md:hidden border-b border-border p-2 flex gap-2 overflow-x-auto scrollbar-thin shrink-0 bg-bg-main/50">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChannel(ch.id)}
            className={cn(
              "shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5",
              ch.id === activeChannelId ? "bg-accent-orange text-white border-accent-orange" : "bg-surface border-border"
            )}
          >
            {ch.type === "direct" ? ch.name : `#${ch.name}`}
            {ch.unreadCount > 0 && (
              <span className="h-4 min-w-4 px-1 rounded-full bg-white/25 text-[9px] font-bold">{ch.unreadCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Channel sidebar */}
      <div className="w-full max-w-[280px] border-r border-border flex flex-col bg-bg-main/50 shrink-0 hidden md:flex">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-text-primary">Discussions</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="New channel">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-secondary" />
            <input
              value={channelSearch}
              onChange={(e) => setChannelSearch(e.target.value)}
              placeholder="Search channels..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-surface border border-border text-sm focus:outline-none focus:border-accent-orange/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-4">
          {channelGroups.map((group) => {
            const groupChannels = filteredChannels.filter((c) => group.types.includes(c.type));
            if (groupChannels.length === 0) return null;
            return (
              <div key={group.label}>
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-secondary px-3 mb-1.5">{group.label}</p>
                <div className="space-y-0.5">
                  {groupChannels.map((ch) => (
                    <ChannelItem
                      key={ch.id}
                      channel={ch}
                      active={ch.id === activeChannelId}
                      onClick={() => setActiveChannel(ch.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeChannel ? (
          <>
            <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-b border-border bg-surface">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-xl bg-accent-orange/10 flex items-center justify-center shrink-0">
                  {(() => { const I = channelIcons[activeChannel.type]; return <I className="h-4 w-4 text-accent-orange" />; })()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-text-primary truncate">
                    {activeChannel.type === "direct" ? activeChannel.name : `# ${activeChannel.name}`}
                  </h3>
                  <p className="text-xs text-text-secondary truncate">
                    {activeChannel.description} · {activeChannel.memberCount} members
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="hidden sm:flex -space-x-2 mr-2">
                  {["Ali Hassan", "Ahmed Raza", "Zainab Qureshi"].map((n) => (
                    <Avatar key={n} name={n} size="sm" className="ring-2 ring-surface" />
                  ))}
                </div>
                <button className="p-2 rounded-lg hover:bg-bg-main text-text-secondary"><MoreVertical className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-5 space-y-4 bg-bg-main/30">
              {channelMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-text-secondary">
                  <MessageCircle className="h-10 w-10 mb-2 opacity-30" />
                  <p className="text-sm">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                channelMessages.map((msg, i) => {
                  const isOwn = msg.senderId === user.id;
                  const showAvatar = i === 0 || channelMessages[i - 1]?.senderId !== msg.senderId;
                  return (
                    <div key={msg.id} className={cn("flex gap-3", isOwn && "flex-row-reverse")}>
                      {showAvatar ? <Avatar name={msg.senderName} size="sm" className="shrink-0 mt-0.5" /> : <div className="w-7 shrink-0" />}
                      <div className={cn("max-w-[75%]", isOwn && "items-end")}>
                        {showAvatar && (
                          <div className={cn("flex items-baseline gap-2 mb-1", isOwn && "flex-row-reverse")}>
                            <span className="text-sm font-semibold text-text-primary">{msg.senderName}</span>
                            <span className="text-[10px] text-text-secondary">{formatRelative(msg.timestamp)}</span>
                          </div>
                        )}
                        <div className={cn(
                          "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                          isOwn
                            ? "bg-accent-orange text-white rounded-tr-sm"
                            : "bg-surface border border-border text-text-primary rounded-tl-sm"
                        )}>
                          {msg.content.split(/(@\w+)/g).map((part, j) =>
                            part.startsWith("@") ? (
                              <span key={j} className={cn("font-semibold", isOwn ? "text-white underline" : "text-accent-orange")}>{part}</span>
                            ) : part
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 md:p-4 border-t border-border bg-surface">
              <div className="flex items-end gap-2 bg-bg-main rounded-2xl border border-border p-2 focus-within:border-accent-orange/40 focus-within:ring-2 focus-within:ring-accent-orange/10 transition-all">
                <button className="p-2 rounded-lg text-text-secondary hover:text-accent-orange hover:bg-surface transition-colors shrink-0">
                  <Paperclip className="h-4 w-4" />
                </button>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message #${activeChannel.name}...`}
                  rows={1}
                  className="flex-1 bg-transparent text-sm resize-none focus:outline-none py-2 max-h-24 text-text-primary placeholder:text-text-secondary/60"
                />
                <button className="p-2 rounded-lg text-text-secondary hover:text-accent-orange transition-colors shrink-0">
                  <Smile className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-xl bg-accent-orange text-white hover:bg-[#D96E15] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-text-secondary mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-secondary">
            Select a channel to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
