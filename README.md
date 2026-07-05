# 360 WorkFlow

A modern Company Resource Management and Work Management Dashboard by **360 Tech Solution**.

## Overview

360 WorkFlow is a simplified company management platform inspired by ClickUp, combining project management, task tracking, employee management, HR functions, and team productivity into one clean dashboard.

## Features

- **Dashboard** — KPI cards, charts, widgets, and quick actions
- **My Work** — Employee-focused task view (Today, Upcoming, Overdue)
- **Projects & Tasks** — List, Kanban board, and calendar views with drag-and-drop
- **Company Management** — Employees, departments, teams, clients
- **HR Modules** — Attendance, leave requests, daily work reports
- **Time Tracking** — Timer and manual time entry
- **Documents** — File management with categories
- **Reports & Analytics** — Exportable reports (PDF, Excel, CSV)
- **Roles & Permissions** — Permission matrix for all modules
- **Dark/Light Mode** — Full theme support
- **Responsive** — Desktop, tablet, and mobile layouts

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Recharts** — Dashboard charts
- **@dnd-kit** — Kanban drag-and-drop
- **Zustand** — State management
- **next-themes** — Dark/light mode
- **Lucide React** — Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Demo Login

- **Email:** sameer@360tech.com
- **Password:** password

## Color Theme

| Color | Hex |
|-------|-----|
| Dark Navy | #071B33 |
| Royal Blue | #2563EB |
| Electric Cyan | #06B6D4 |
| Light Blue | #EAF4FF |
| Background | #F6F8FC |

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, forgot password
│   └── (dashboard)/     # All dashboard pages
├── components/
│   ├── charts/          # Recharts components
│   ├── layout/          # Sidebar, top nav
│   ├── tasks/           # Task cards, Kanban, modals
│   └── ui/              # Reusable UI components
├── data/mock/           # Mock data (API-ready)
├── lib/                 # Utils, constants, navigation
├── store/               # Zustand stores
└── types/               # TypeScript types
```

## User Roles (Demo)

Use **Profile → Switch Role (Demo)** in the top navigation to preview different panels:

| Role | Dashboard |
|------|-----------|
| Super Admin | `/super-admin` — Companies, workspaces, subscriptions, audit logs |
| Company Admin | `/dashboard` — Full company management |
| Manager | `/dashboard` — Team and project management |
| Employee | `/my-work` — Personal task-focused view |
| HR | `/dashboard` — Employee, attendance, leave focus |
| Client | `/client` — Limited project access portal |

## Pages (49 routes)

### Authentication
- Login, Forgot Password, Reset Password

### Core Dashboard
- Dashboard, My Work, Workspace

### Work Management
- Projects (list, detail, create), Tasks (list, Kanban, calendar), Calendar

### Company
- Employees (list, profile, add), Departments, Teams, Clients (list, profile, add)

### HR
- Attendance, Leave Requests, Daily Reports (list, submit), Time Tracking

### Communication
- Announcements, Notifications, Activity Log, Documents

### Reports
- Analytics, Performance, Reports

### Settings
- Roles & Permissions, Company Settings, System Settings

### Super Admin
- Global Dashboard, Companies, Workspaces, Users, Subscriptions, Audit Logs, Security, Platform Settings

### Client Portal
- Client Dashboard, Projects, Milestones, Files, Feedback, Support

## License

Private — 360 Tech Solution
