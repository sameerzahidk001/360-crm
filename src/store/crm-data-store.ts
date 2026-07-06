import { create } from "zustand";
import type {
  Announcement,
  DailyReport,
  Department,
  Team,
  Project,
  ProjectStatus,
  ProjectPriority,
  AnnouncementPriority,
} from "@/types";
import {
  announcements as initialAnnouncements,
  dailyReports as initialDailyReports,
  teams as initialTeams,
  departments as initialDepartments,
  clientFeedback as initialFeedback,
  supportRequests as initialSupport,
  platformCompanies as initialCompanies,
  projects as initialProjects,
} from "@/data/mock";

export interface ClientFeedbackItem {
  id: string;
  projectId: string;
  author: string;
  message: string;
  rating: number;
  date: string;
}

export interface SupportRequestItem {
  id: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface PlatformCompany {
  id: string;
  name: string;
  plan: string;
  users: number;
  workspaces: number;
  status: string;
  createdAt: string;
}

interface CrmDataState {
  announcements: Announcement[];
  dailyReports: DailyReport[];
  teams: Team[];
  departments: Department[];
  clientFeedback: ClientFeedbackItem[];
  supportRequests: SupportRequestItem[];
  platformCompanies: PlatformCompany[];
  projects: Project[];
  addAnnouncement: (data: Omit<Announcement, "id">) => void;
  addDailyReport: (data: Omit<DailyReport, "id">) => void;
  addTeam: (data: Omit<Team, "id">) => void;
  addDepartment: (data: Omit<Department, "id">) => void;
  addFeedback: (data: Omit<ClientFeedbackItem, "id">) => void;
  addSupportRequest: (data: Omit<SupportRequestItem, "id">) => void;
  addCompany: (data: Omit<PlatformCompany, "id">) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  addProject: (data: Omit<Project, "id">) => void;
}

export const useCrmDataStore = create<CrmDataState>((set) => ({
  announcements: initialAnnouncements,
  dailyReports: initialDailyReports,
  teams: initialTeams,
  departments: initialDepartments,
  clientFeedback: initialFeedback,
  supportRequests: initialSupport,
  platformCompanies: initialCompanies,
  projects: initialProjects,

  addAnnouncement: (data) =>
    set((s) => ({
      announcements: [{ ...data, id: `an-${Date.now()}` }, ...s.announcements],
    })),

  addDailyReport: (data) =>
    set((s) => ({
      dailyReports: [{ ...data, id: `dr-${Date.now()}` }, ...s.dailyReports],
    })),

  addTeam: (data) =>
    set((s) => ({
      teams: [{ ...data, id: `t-${Date.now()}` }, ...s.teams],
    })),

  addDepartment: (data) =>
    set((s) => ({
      departments: [{ ...data, id: `d-${Date.now()}` }, ...s.departments],
    })),

  addFeedback: (data) =>
    set((s) => ({
      clientFeedback: [{ ...data, id: `fb-${Date.now()}` }, ...s.clientFeedback],
    })),

  addSupportRequest: (data) =>
    set((s) => ({
      supportRequests: [{ ...data, id: `sr-${Date.now()}` }, ...s.supportRequests],
    })),

  addCompany: (data) =>
    set((s) => ({
      platformCompanies: [{ ...data, id: `co-${Date.now()}` }, ...s.platformCompanies],
    })),

  updateProject: (id, data) =>
    set((s) => ({
      projects: s.projects.map((p) => (p.id === id ? { ...p, ...data } : p)),
    })),

  addProject: (data) =>
    set((s) => ({
      projects: [{ ...data, id: `p-${Date.now()}` }, ...s.projects],
    })),
}));

export type { ProjectStatus, ProjectPriority, AnnouncementPriority };
