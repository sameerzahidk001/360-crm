import { create } from "zustand";
import type { ChatChannel, ChatMessage } from "@/types";
import { chatChannels as initialChannels, chatMessages as initialMessages } from "@/data/mock";

interface ChatState {
  channels: ChatChannel[];
  messages: ChatMessage[];
  activeChannelId: string;
  setActiveChannel: (id: string) => void;
  sendMessage: (channelId: string, senderId: string, senderName: string, content: string) => void;
  markChannelRead: (channelId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  channels: initialChannels,
  messages: initialMessages,
  activeChannelId: "ch3",
  setActiveChannel: (id) =>
    set((s) => ({
      activeChannelId: id,
      channels: s.channels.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)),
    })),
  sendMessage: (channelId, senderId, senderName, content) => {
    const msg: ChatMessage = {
      id: `m-${Date.now()}`,
      channelId,
      senderId,
      senderName,
      content,
      timestamp: new Date().toISOString(),
    };
    set((s) => ({
      messages: [...s.messages, msg],
      channels: s.channels.map((c) =>
        c.id === channelId
          ? { ...c, lastMessage: content, lastMessageAt: msg.timestamp }
          : c
      ),
    }));
  },
  markChannelRead: (channelId) =>
    set((s) => ({
      channels: s.channels.map((c) => (c.id === channelId ? { ...c, unreadCount: 0 } : c)),
    })),
}));
