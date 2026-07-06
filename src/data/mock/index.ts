import type {
  User,
  Department,
  Team,
  Employee,
  Client,
  Project,
  Task,
  AttendanceRecord,
  LeaveRequest,
  DailyReport,
  Announcement,
  Activity,
  Notification,
  Document,
  ChatChannel,
  ChatMessage,
} from "@/types";

export const currentUser: User = {
  id: "u1",
  email: "sameer@360tech.com",
  name: "Sameer Ahmed",
  role: "company_admin",
  departmentId: "d1",
  status: "active",
};

export const departments: Department[] = [
  { id: "d1", name: "Development", headId: "e1", headName: "Ali Hassan", employeeCount: 24, teamCount: 4, projectCount: 8, description: "Software development and engineering" },
  { id: "d2", name: "Design", headId: "e5", headName: "Sara Khan", employeeCount: 12, teamCount: 2, projectCount: 5 },
  { id: "d3", name: "Marketing", headId: "e8", headName: "Usman Malik", employeeCount: 10, teamCount: 2, projectCount: 4 },
  { id: "d4", name: "Sales", headId: "e10", headName: "Fatima Noor", employeeCount: 8, teamCount: 2, projectCount: 3 },
  { id: "d5", name: "Human Resources", headId: "e12", headName: "Ayesha Raza", employeeCount: 5, teamCount: 1, projectCount: 1 },
  { id: "d6", name: "Finance", headId: "e14", headName: "Bilal Shah", employeeCount: 6, teamCount: 1, projectCount: 2 },
  { id: "d7", name: "Customer Support", headId: "e16", headName: "Hina Ali", employeeCount: 9, teamCount: 2, projectCount: 2 },
];

export const teams: Team[] = [
  { id: "t1", name: "Frontend Team", departmentId: "d1", departmentName: "Development", leaderId: "e2", leaderName: "Ahmed Raza", memberCount: 6, activeProjects: 3 },
  { id: "t2", name: "Backend Team", departmentId: "d1", departmentName: "Development", leaderId: "e3", leaderName: "Zainab Qureshi", memberCount: 8, activeProjects: 4 },
  { id: "t3", name: "UI/UX Team", departmentId: "d2", departmentName: "Design", leaderId: "e5", leaderName: "Sara Khan", memberCount: 5, activeProjects: 3 },
  { id: "t4", name: "Digital Marketing", departmentId: "d3", departmentName: "Marketing", leaderId: "e8", leaderName: "Usman Malik", memberCount: 6, activeProjects: 2 },
];

export const employees: Employee[] = [
  { id: "e1", employeeId: "EMP-001", name: "Ali Hassan", email: "ali@360tech.com", phone: "+92 300 1234567", departmentId: "d1", departmentName: "Development", designation: "Tech Lead", teamId: "t2", teamName: "Backend Team", joiningDate: "2022-03-15", employmentType: "full_time", workingHours: "9:00 AM - 6:00 PM", status: "active", skills: ["Node.js", "Python", "AWS"] },
  { id: "e2", employeeId: "EMP-002", name: "Ahmed Raza", email: "ahmed@360tech.com", phone: "+92 301 2345678", departmentId: "d1", departmentName: "Development", designation: "Senior Developer", managerId: "e1", managerName: "Ali Hassan", teamId: "t1", teamName: "Frontend Team", joiningDate: "2022-06-01", employmentType: "full_time", workingHours: "9:00 AM - 6:00 PM", status: "active", skills: ["React", "TypeScript", "Next.js"] },
  { id: "e3", employeeId: "EMP-003", name: "Zainab Qureshi", email: "zainab@360tech.com", phone: "+92 302 3456789", departmentId: "d1", departmentName: "Development", designation: "Backend Developer", managerId: "e1", managerName: "Ali Hassan", teamId: "t2", teamName: "Backend Team", joiningDate: "2023-01-10", employmentType: "full_time", workingHours: "9:00 AM - 6:00 PM", status: "active", skills: ["Java", "Spring Boot", "PostgreSQL"] },
  { id: "e4", employeeId: "EMP-004", name: "Hassan Mehmood", email: "hassan@360tech.com", phone: "+92 303 4567890", departmentId: "d1", departmentName: "Development", designation: "Junior Developer", managerId: "e2", managerName: "Ahmed Raza", teamId: "t1", teamName: "Frontend Team", joiningDate: "2024-02-20", employmentType: "full_time", workingHours: "9:00 AM - 6:00 PM", status: "probation", skills: ["JavaScript", "React"] },
  { id: "e5", employeeId: "EMP-005", name: "Sara Khan", email: "sara@360tech.com", phone: "+92 304 5678901", departmentId: "d2", departmentName: "Design", designation: "Design Lead", teamId: "t3", teamName: "UI/UX Team", joiningDate: "2021-08-05", employmentType: "full_time", workingHours: "9:00 AM - 6:00 PM", status: "active", skills: ["Figma", "UI Design", "Prototyping"] },
  { id: "e6", employeeId: "EMP-006", name: "Maryam Siddiqui", email: "maryam@360tech.com", phone: "+92 305 6789012", departmentId: "d2", departmentName: "Design", designation: "UI Designer", managerId: "e5", managerName: "Sara Khan", teamId: "t3", teamName: "UI/UX Team", joiningDate: "2023-04-12", employmentType: "full_time", workingHours: "9:00 AM - 6:00 PM", status: "active", skills: ["Figma", "Illustrator"] },
];

export const clients: Client[] = [
  { id: "c1", name: "John Smith", companyName: "TechCorp Inc.", email: "john@techcorp.com", phone: "+1 555 0101", country: "USA", status: "active", accountManagerId: "e1", accountManagerName: "Ali Hassan", projectCount: 2 },
  { id: "c2", name: "Emily Johnson", companyName: "Digital Solutions Ltd", email: "emily@digitalsolutions.com", phone: "+44 20 7946", country: "UK", status: "active", accountManagerId: "e8", accountManagerName: "Usman Malik", projectCount: 1 },
  { id: "c3", name: "Mohammed Al-Rashid", companyName: "Gulf Enterprises", email: "mohammed@gulfent.com", phone: "+971 4 123 4567", country: "UAE", status: "lead", projectCount: 0 },
  { id: "c4", name: "Lisa Chen", companyName: "InnovateTech", email: "lisa@innovatetech.com", phone: "+86 10 1234 5678", country: "China", status: "active", accountManagerId: "e1", accountManagerName: "Ali Hassan", projectCount: 1 },
  { id: "c5", name: "David Wilson", companyName: "StartupHub", email: "david@startuphub.io", phone: "+1 555 0202", country: "USA", status: "on_hold", projectCount: 1 },
];

export const projects: Project[] = [
  { id: "p1", title: "360 WorkFlow Platform", description: "Company resource management and work management dashboard", clientId: "c1", clientName: "TechCorp Inc.", departmentId: "d1", departmentName: "Development", teamId: "t1", teamName: "Frontend Team", managerId: "e1", managerName: "Ali Hassan", memberIds: ["e2", "e3", "e4", "e5"], startDate: "2026-01-15", deadline: "2026-06-30", priority: "high", status: "active", progress: 65, budget: 50000, tags: ["SaaS", "Dashboard"], taskCount: 24, completedTaskCount: 16 },
  { id: "p2", title: "E-Commerce Mobile App", description: "Cross-platform mobile application for online shopping", clientId: "c2", clientName: "Digital Solutions Ltd", departmentId: "d1", departmentName: "Development", teamId: "t2", teamName: "Backend Team", managerId: "e1", managerName: "Ali Hassan", memberIds: ["e2", "e3"], startDate: "2026-02-01", deadline: "2026-08-15", priority: "urgent", status: "active", progress: 40, budget: 75000, tags: ["Mobile", "E-Commerce"], taskCount: 18, completedTaskCount: 7 },
  { id: "p3", title: "Brand Identity Redesign", description: "Complete brand identity and marketing materials", clientId: "c4", clientName: "InnovateTech", departmentId: "d2", departmentName: "Design", teamId: "t3", teamName: "UI/UX Team", managerId: "e5", managerName: "Sara Khan", memberIds: ["e5", "e6"], startDate: "2026-03-01", deadline: "2026-05-30", priority: "normal", status: "active", progress: 75, tags: ["Branding", "Design"], taskCount: 12, completedTaskCount: 9 },
  { id: "p4", title: "CRM Integration Module", description: "Customer relationship management integration", clientId: "c1", clientName: "TechCorp Inc.", departmentId: "d1", departmentName: "Development", managerId: "e1", managerName: "Ali Hassan", memberIds: ["e3"], startDate: "2026-04-01", deadline: "2026-07-15", priority: "normal", status: "planning", progress: 10, taskCount: 8, completedTaskCount: 1 },
  { id: "p5", title: "Marketing Campaign Q2", description: "Q2 digital marketing campaign", clientId: "c2", clientName: "Digital Solutions Ltd", departmentId: "d3", departmentName: "Marketing", teamId: "t4", teamName: "Digital Marketing", managerId: "e8", managerName: "Usman Malik", memberIds: [], startDate: "2026-04-01", deadline: "2026-06-30", priority: "high", status: "active", progress: 55, taskCount: 15, completedTaskCount: 8 },
];

export const tasks: Task[] = [
  { id: "tk1", title: "Design dashboard layout", description: "Create wireframes and mockups for main dashboard", projectId: "p1", projectName: "360 WorkFlow Platform", assigneeIds: ["e5"], assigneeNames: ["Sara Khan"], priority: "high", status: "completed", startDate: "2026-01-20", dueDate: "2026-02-05", estimatedHours: 16, tags: ["Design"], commentCount: 5, attachmentCount: 3 },
  { id: "tk2", title: "Implement authentication module", description: "Login, forgot password, and role-based access", projectId: "p1", projectName: "360 WorkFlow Platform", assigneeIds: ["e2"], assigneeNames: ["Ahmed Raza"], priority: "urgent", status: "in_progress", startDate: "2026-02-10", dueDate: "2026-03-15", estimatedHours: 24, tags: ["Backend", "Auth"], commentCount: 8, attachmentCount: 1 },
  { id: "tk3", title: "Build task management API", description: "CRUD operations for tasks with filtering", projectId: "p1", projectName: "360 WorkFlow Platform", assigneeIds: ["e3"], assigneeNames: ["Zainab Qureshi"], priority: "high", status: "in_review", startDate: "2026-02-15", dueDate: "2026-03-20", estimatedHours: 32, commentCount: 3 },
  { id: "tk4", title: "Create Kanban board component", description: "Drag and drop task board with status columns", projectId: "p1", projectName: "360 WorkFlow Platform", assigneeIds: ["e2", "e4"], assigneeNames: ["Ahmed Raza", "Hassan Mehmood"], priority: "high", status: "in_progress", startDate: "2026-03-01", dueDate: "2026-03-25", estimatedHours: 20, commentCount: 2 },
  { id: "tk5", title: "Employee management module", description: "Employee CRUD and profile pages", projectId: "p1", projectName: "360 WorkFlow Platform", assigneeIds: ["e4"], assigneeNames: ["Hassan Mehmood"], priority: "normal", status: "todo", startDate: "2026-03-10", dueDate: "2026-04-10", estimatedHours: 28 },
  { id: "tk6", title: "API integration for payments", description: "Integrate Stripe payment gateway", projectId: "p2", projectName: "E-Commerce Mobile App", assigneeIds: ["e3"], assigneeNames: ["Zainab Qureshi"], priority: "urgent", status: "in_progress", startDate: "2026-03-01", dueDate: "2026-03-18", estimatedHours: 16, commentCount: 4 },
  { id: "tk7", title: "Product catalog UI", description: "Design and implement product listing screens", projectId: "p2", projectName: "E-Commerce Mobile App", assigneeIds: ["e2"], assigneeNames: ["Ahmed Raza"], priority: "high", status: "todo", startDate: "2026-03-15", dueDate: "2026-04-01", estimatedHours: 24 },
  { id: "tk8", title: "Logo variations", description: "Create logo variations for different use cases", projectId: "p3", projectName: "Brand Identity Redesign", assigneeIds: ["e6"], assigneeNames: ["Maryam Siddiqui"], priority: "normal", status: "completed", startDate: "2026-03-05", dueDate: "2026-03-20", estimatedHours: 12 },
  { id: "tk9", title: "Social media templates", description: "Design templates for social media posts", projectId: "p3", projectName: "Brand Identity Redesign", assigneeIds: ["e5", "e6"], assigneeNames: ["Sara Khan", "Maryam Siddiqui"], priority: "normal", status: "in_review", startDate: "2026-03-15", dueDate: "2026-04-05", estimatedHours: 16 },
  { id: "tk10", title: "Fix login redirect bug", description: "Users not redirected after successful login", projectId: "p1", projectName: "360 WorkFlow Platform", assigneeIds: ["e2"], assigneeNames: ["Ahmed Raza"], priority: "urgent", status: "todo", startDate: "2026-03-01", dueDate: "2026-03-05", estimatedHours: 4, commentCount: 6 },
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: "a1", employeeId: "e1", employeeName: "Ali Hassan", date: "2026-07-04", checkIn: "08:55 AM", checkOut: "06:10 PM", status: "present", workingHours: "9h 15m" },
  { id: "a2", employeeId: "e2", employeeName: "Ahmed Raza", date: "2026-07-04", checkIn: "09:15 AM", checkOut: "06:00 PM", status: "late", workingHours: "8h 45m" },
  { id: "a3", employeeId: "e3", employeeName: "Zainab Qureshi", date: "2026-07-04", checkIn: "09:00 AM", status: "present" },
  { id: "a4", employeeId: "e4", employeeName: "Hassan Mehmood", date: "2026-07-04", status: "work_from_home", checkIn: "09:30 AM" },
  { id: "a5", employeeId: "e5", employeeName: "Sara Khan", date: "2026-07-04", status: "leave" },
  { id: "a6", employeeId: "e6", employeeName: "Maryam Siddiqui", date: "2026-07-04", checkIn: "08:50 AM", checkOut: "05:55 PM", status: "present", workingHours: "9h 5m" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "l1", employeeId: "e5", employeeName: "Sara Khan", leaveType: "annual", startDate: "2026-07-04", endDate: "2026-07-06", reason: "Family vacation", status: "approved", submittedAt: "2026-06-25" },
  { id: "l2", employeeId: "e4", employeeName: "Hassan Mehmood", leaveType: "sick", startDate: "2026-07-08", endDate: "2026-07-08", reason: "Medical appointment", status: "pending", submittedAt: "2026-07-03" },
  { id: "l3", employeeId: "e2", employeeName: "Ahmed Raza", leaveType: "casual", startDate: "2026-07-15", endDate: "2026-07-15", reason: "Personal work", status: "pending", submittedAt: "2026-07-02" },
  { id: "l4", employeeId: "e6", employeeName: "Maryam Siddiqui", leaveType: "work_from_home", startDate: "2026-07-10", endDate: "2026-07-10", reason: "Home renovation", status: "approved", submittedAt: "2026-07-01" },
];

export const dailyReports: DailyReport[] = [
  { id: "dr1", employeeId: "e2", employeeName: "Ahmed Raza", date: "2026-07-03", tasksWorkedOn: "Authentication module, Kanban board", workCompleted: "Completed login page UI and started JWT integration", currentStatus: "JWT integration 70% complete", blockers: "Waiting for API endpoint documentation", plansForTomorrow: "Complete JWT integration and start role-based routing", totalHours: 8, status: "reviewed" },
  { id: "dr2", employeeId: "e3", employeeName: "Zainab Qureshi", date: "2026-07-03", tasksWorkedOn: "Task management API, Payment integration", workCompleted: "Finished task CRUD endpoints and started payment API", currentStatus: "Payment API integration in progress", plansForTomorrow: "Complete Stripe integration testing", totalHours: 9, status: "submitted" },
  { id: "dr3", employeeId: "e4", employeeName: "Hassan Mehmood", date: "2026-07-03", tasksWorkedOn: "Kanban board component", workCompleted: "Set up drag-and-drop library and basic column layout", currentStatus: "Working on task card component", plansForTomorrow: "Complete task cards and drag functionality", totalHours: 7.5, status: "submitted" },
];

export const announcements: Announcement[] = [
  { id: "an1", title: "Company Holiday - Independence Day", message: "Office will remain closed on August 14th for Independence Day celebrations.", audience: "All Employees", publishDate: "2026-07-01", priority: "important", authorName: "HR Team" },
  { id: "an2", title: "New Project Kickoff", message: "We are excited to announce the kickoff of the 360 WorkFlow Platform project. All team members please attend the briefing on Monday.", audience: "Development", publishDate: "2026-06-28", priority: "normal", authorName: "Ali Hassan" },
  { id: "an3", title: "Security Update Required", message: "Please update your passwords and enable two-factor authentication by end of this week.", audience: "All Employees", publishDate: "2026-07-03", priority: "urgent", authorName: "IT Security" },
];

export const activities: Activity[] = [
  { id: "ac1", userId: "e2", userName: "Ahmed Raza", action: "completed task", target: "Design dashboard layout", timestamp: "2026-07-04T10:30:00" },
  { id: "ac2", userId: "e3", userName: "Zainab Qureshi", action: "moved task to In Review", target: "Build task management API", timestamp: "2026-07-04T09:15:00" },
  { id: "ac3", userId: "e1", userName: "Ali Hassan", action: "created project", target: "CRM Integration Module", timestamp: "2026-07-03T16:45:00" },
  { id: "ac4", userId: "e4", userName: "Hassan Mehmood", action: "submitted daily report", target: "Daily Report - Jul 3", timestamp: "2026-07-03T18:00:00" },
  { id: "ac5", userId: "e5", userName: "Sara Khan", action: "submitted leave request", target: "Annual Leave (Jul 4-6)", timestamp: "2026-06-25T11:20:00" },
  { id: "ac6", userId: "u1", userName: "Sameer Ahmed", action: "approved leave", target: "Sara Khan - Annual Leave", timestamp: "2026-06-26T09:00:00" },
  { id: "ac7", userId: "e2", userName: "Ahmed Raza", action: "uploaded file", target: "auth-flow-diagram.pdf", timestamp: "2026-07-04T08:30:00" },
  { id: "ac8", userId: "e6", userName: "Maryam Siddiqui", action: "completed task", target: "Logo variations", timestamp: "2026-07-03T17:30:00" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "New Task Assigned", message: "You have been assigned to 'Create Kanban board component'", type: "task", read: false, timestamp: "2026-07-04T09:00:00" },
  { id: "n2", title: "Task Deadline Reminder", message: "'Fix login redirect bug' is due tomorrow", type: "deadline", read: false, timestamp: "2026-07-04T08:00:00" },
  { id: "n3", title: "Leave Approved", message: "Your annual leave request has been approved", type: "leave", read: true, timestamp: "2026-06-26T09:30:00" },
  { id: "n4", title: "Daily Report Feedback", message: "Your manager reviewed your daily report", type: "report", read: false, timestamp: "2026-07-04T10:00:00" },
  { id: "n5", title: "New Announcement", message: "Security Update Required - Please read", type: "announcement", read: false, timestamp: "2026-07-03T14:00:00" },
];

export const documents: Document[] = [
  { id: "doc1", name: "Company Policy Handbook.pdf", category: "Company Documents", size: "2.4 MB", uploadedBy: "HR Team", uploadedAt: "2026-01-15" },
  { id: "doc2", name: "Project Requirements.docx", category: "Project Files", size: "1.1 MB", uploadedBy: "Ali Hassan", uploadedAt: "2026-02-01", projectId: "p1" },
  { id: "doc3", name: "auth-flow-diagram.pdf", category: "Project Files", size: "856 KB", uploadedBy: "Ahmed Raza", uploadedAt: "2026-07-04", projectId: "p1" },
  { id: "doc4", name: "Employee Contract Template.pdf", category: "HR Documents", size: "320 KB", uploadedBy: "HR Team", uploadedAt: "2025-12-01" },
  { id: "doc5", name: "Brand Guidelines.pdf", category: "Client Files", size: "5.2 MB", uploadedBy: "Sara Khan", uploadedAt: "2026-03-10", projectId: "p3" },
];

export const chatChannels: ChatChannel[] = [
  { id: "ch1", name: "general", type: "general", description: "Company-wide discussions", memberCount: 74, unreadCount: 2, lastMessage: "Welcome to 360 WorkFlow!", lastMessageAt: "2026-07-05T09:00:00" },
  { id: "ch2", name: "frontend-team", type: "team", description: "Frontend Team channel", memberCount: 6, unreadCount: 3, lastMessage: "Kanban board is ready for review", lastMessageAt: "2026-07-05T10:30:00", teamId: "t1" },
  { id: "ch3", name: "360-workflow", type: "project", description: "360 WorkFlow Platform project", memberCount: 8, unreadCount: 5, lastMessage: "@Ahmed please check the auth module", lastMessageAt: "2026-07-05T11:15:00", projectId: "p1" },
  { id: "ch4", name: "development", type: "department", description: "Development department", memberCount: 24, unreadCount: 0, lastMessage: "Sprint planning tomorrow at 10 AM", lastMessageAt: "2026-07-04T16:00:00" },
  { id: "ch5", name: "Ali Hassan", type: "direct", description: "Direct message", memberCount: 2, unreadCount: 1, lastMessage: "Can you review my PR?", lastMessageAt: "2026-07-05T08:45:00" },
  { id: "ch6", name: "hr-announcements", type: "department", description: "HR updates & queries", memberCount: 74, unreadCount: 0, lastMessage: "Leave policy updated for Q3", lastMessageAt: "2026-07-03T14:00:00" },
  { id: "ch7", name: "e-commerce-app", type: "project", description: "E-Commerce Mobile App", memberCount: 5, unreadCount: 2, lastMessage: "Payment API integration done", lastMessageAt: "2026-07-04T17:20:00", projectId: "p2" },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", channelId: "ch3", senderId: "e1", senderName: "Ali Hassan", content: "Team, let's sync on the dashboard module today.", timestamp: "2026-07-05T09:00:00" },
  { id: "m2", channelId: "ch3", senderId: "e2", senderName: "Ahmed Raza", content: "Sure! I've completed the login page and JWT setup.", timestamp: "2026-07-05T09:15:00" },
  { id: "m3", channelId: "ch3", senderId: "e3", senderName: "Zainab Qureshi", content: "Task API endpoints are ready for integration.", timestamp: "2026-07-05T09:30:00" },
  { id: "m4", channelId: "ch3", senderId: "e5", senderName: "Sara Khan", content: "Design mockups for the employee module are uploaded.", timestamp: "2026-07-05T10:00:00" },
  { id: "m5", channelId: "ch3", senderId: "e1", senderName: "Ali Hassan", content: "@Ahmed please check the auth module before EOD.", timestamp: "2026-07-05T11:15:00", mentions: ["Ahmed Raza"] },
  { id: "m6", channelId: "ch2", senderId: "e2", senderName: "Ahmed Raza", content: "Kanban board is ready for review 🎉", timestamp: "2026-07-05T10:30:00" },
  { id: "m7", channelId: "ch2", senderId: "e4", senderName: "Hassan Mehmood", content: "Looks great! Drag and drop works smoothly.", timestamp: "2026-07-05T10:45:00" },
  { id: "m8", channelId: "ch1", senderId: "u1", senderName: "Sameer Ahmed", content: "Welcome everyone to 360 WorkFlow! 🚀", timestamp: "2026-07-05T09:00:00" },
  { id: "m9", channelId: "ch1", senderId: "e12", senderName: "Ayesha Raza", content: "HR team is here if you need any help with onboarding.", timestamp: "2026-07-05T09:30:00" },
  { id: "m10", channelId: "ch5", senderId: "e1", senderName: "Ali Hassan", content: "Can you review my PR for the task API?", timestamp: "2026-07-05T08:45:00" },
  { id: "m11", channelId: "ch5", senderId: "e2", senderName: "Ahmed Raza", content: "On it! Will check in 30 mins.", timestamp: "2026-07-05T08:50:00" },
  { id: "m12", channelId: "ch4", senderId: "e1", senderName: "Ali Hassan", content: "Sprint planning tomorrow at 10 AM in meeting room.", timestamp: "2026-07-04T16:00:00" },
  { id: "m13", channelId: "ch7", senderId: "e3", senderName: "Zainab Qureshi", content: "Payment API integration is complete. Ready for testing.", timestamp: "2026-07-04T17:20:00" },
];

export const dashboardKPIs = {
  totalEmployees: 74,
  activeEmployees: 68,
  totalClients: 12,
  activeProjects: 8,
  completedProjects: 15,
  totalTasks: 77,
  tasksInProgress: 18,
  completedTasks: 42,
  overdueTasks: 5,
  pendingApprovals: 7,
  presentToday: 52,
  absentToday: 8,
  leaveRequests: 4,
  totalDepartments: 7,
};

export const chartData = {
  taskCompletion: [
    { month: "Jan", completed: 12, created: 18 },
    { month: "Feb", completed: 18, created: 22 },
    { month: "Mar", completed: 15, created: 20 },
    { month: "Apr", completed: 22, created: 25 },
    { month: "May", completed: 28, created: 30 },
    { month: "Jun", completed: 32, created: 28 },
  ],
  projectProgress: [
    { name: "360 WorkFlow", progress: 65 },
    { name: "E-Commerce App", progress: 40 },
    { name: "Brand Redesign", progress: 75 },
    { name: "CRM Module", progress: 10 },
    { name: "Marketing Q2", progress: 55 },
  ],
  teamWorkload: [
    { team: "Frontend", tasks: 12, capacity: 15 },
    { team: "Backend", tasks: 18, capacity: 20 },
    { team: "UI/UX", tasks: 8, capacity: 12 },
    { team: "Marketing", tasks: 10, capacity: 10 },
  ],
  attendance: [
    { day: "Mon", present: 58, absent: 6, late: 4 },
    { day: "Tue", present: 55, absent: 8, late: 5 },
    { day: "Wed", present: 60, absent: 4, late: 4 },
    { day: "Thu", present: 57, absent: 7, late: 4 },
    { day: "Fri", present: 52, absent: 8, late: 6 },
  ],
};

export const demoUsers = {
  super_admin: { id: "sa1", email: "admin@360workflow.com", name: "Platform Admin", role: "super_admin" as const, status: "active" as const },
  company_admin: { id: "u1", email: "sameer@360tech.com", name: "Sameer Ahmed", role: "company_admin" as const, departmentId: "d1", status: "active" as const },
  manager: { id: "e1", email: "ali@360tech.com", name: "Ali Hassan", role: "manager" as const, departmentId: "d1", status: "active" as const },
  employee: { id: "e2", email: "ahmed@360tech.com", name: "Ahmed Raza", role: "employee" as const, departmentId: "d1", teamId: "t1", status: "active" as const },
  hr: { id: "e12", email: "hr@360tech.com", name: "Ayesha Raza", role: "hr" as const, departmentId: "d5", status: "active" as const },
  client: { id: "c1u", email: "john@techcorp.com", name: "John Smith", role: "client" as const, status: "active" as const },
};

export const workspaces = [
  { id: "ws1", name: "360 Tech Solution", logo: "360", members: 74, departments: 7, projects: 8, status: "active" as const, createdAt: "2024-01-01" },
  { id: "ws2", name: "Digital Agency Hub", logo: "DA", members: 32, departments: 4, projects: 5, status: "active" as const, createdAt: "2025-03-15" },
  { id: "ws3", name: "Startup Labs", logo: "SL", members: 18, departments: 3, projects: 2, status: "archived" as const, createdAt: "2025-06-01" },
];

export const platformCompanies = [
  { id: "co1", name: "360 Tech Solution", plan: "Enterprise", users: 74, workspaces: 1, status: "active", createdAt: "2024-01-01" },
  { id: "co2", name: "Digital Solutions Ltd", plan: "Professional", users: 32, workspaces: 1, status: "active", createdAt: "2024-06-15" },
  { id: "co3", name: "InnovateTech", plan: "Professional", users: 45, workspaces: 2, status: "active", createdAt: "2025-01-10" },
  { id: "co4", name: "StartupHub", plan: "Starter", users: 12, workspaces: 1, status: "trial", createdAt: "2026-02-01" },
  { id: "co5", name: "Gulf Enterprises", plan: "Starter", users: 8, workspaces: 1, status: "inactive", createdAt: "2025-11-20" },
];

export const subscriptionPlans = [
  { id: "starter", name: "Starter", price: 29, users: 15, storage: "10 GB", companies: 28 },
  { id: "professional", name: "Professional", price: 79, users: 50, storage: "50 GB", companies: 42 },
  { id: "enterprise", name: "Enterprise", price: 199, users: "Unlimited", storage: "500 GB", companies: 18 },
];

export const auditLogs = [
  { id: "al1", user: "Platform Admin", action: "Updated subscription plan", target: "Digital Solutions Ltd", ip: "192.168.1.1", timestamp: "2026-07-04T10:00:00" },
  { id: "al2", user: "Sameer Ahmed", action: "Created employee", target: "Hassan Mehmood", ip: "10.0.0.45", timestamp: "2026-07-03T14:30:00" },
  { id: "al3", user: "Platform Admin", action: "Enabled module", target: "Time Tracking", ip: "192.168.1.1", timestamp: "2026-07-02T09:15:00" },
  { id: "al4", user: "Ali Hassan", action: "Approved leave", target: "Sara Khan", ip: "10.0.0.22", timestamp: "2026-06-26T09:00:00" },
];

export const loginHistory = [
  { id: "lh1", user: "Sameer Ahmed", device: "Chrome on Windows", location: "Karachi, PK", ip: "10.0.0.45", timestamp: "2026-07-04T08:30:00", status: "success" },
  { id: "lh2", user: "Ahmed Raza", device: "Safari on macOS", location: "Lahore, PK", ip: "10.0.0.88", timestamp: "2026-07-04T09:00:00", status: "success" },
  { id: "lh3", user: "Unknown", device: "Firefox on Linux", location: "Unknown", ip: "45.33.22.11", timestamp: "2026-07-03T22:15:00", status: "failed" },
];

export const projectMilestones = [
  { id: "m1", projectId: "p1", title: "UI/UX Design Complete", dueDate: "2026-02-28", status: "completed", progress: 100 },
  { id: "m2", projectId: "p1", title: "Authentication Module", dueDate: "2026-03-15", status: "completed", progress: 100 },
  { id: "m3", projectId: "p1", title: "Core Modules Beta", dueDate: "2026-05-30", status: "in_progress", progress: 65 },
  { id: "m4", projectId: "p1", title: "Production Launch", dueDate: "2026-06-30", status: "pending", progress: 0 },
];

export const clientFeedback = [
  { id: "fb1", projectId: "p1", author: "John Smith", message: "Great progress on the dashboard design. Love the clean interface.", rating: 5, date: "2026-07-01" },
  { id: "fb2", projectId: "p1", author: "John Smith", message: "Can we add more export options to reports?", rating: 4, date: "2026-06-20" },
];

export const supportRequests = [
  { id: "sr1", subject: "Need access to project files", status: "open", priority: "normal", createdAt: "2026-07-03" },
  { id: "sr2", subject: "Question about milestone timeline", status: "resolved", priority: "low", createdAt: "2026-06-28" },
];

