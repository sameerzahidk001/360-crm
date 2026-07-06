import { create } from "zustand";
import type { Task, TaskStatus } from "@/types";
import { tasks as initialTasks } from "@/data/mock";

interface TaskState {
  tasks: Task[];
  addTask: (data: Omit<Task, "id">) => Task;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  reorderTasks: (taskId: string, newStatus: TaskStatus, overTaskId?: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: initialTasks,
  addTask: (data) => {
    const task: Task = { ...data, id: `tk-${Date.now()}` };
    set((s) => ({ tasks: [task, ...s.tasks] }));
    return task;
  },
  updateTaskStatus: (taskId, status) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),
  reorderTasks: (taskId, newStatus, overTaskId) =>
    set((s) => {
      const task = s.tasks.find((t) => t.id === taskId);
      if (!task) return s;

      const without = s.tasks.filter((t) => t.id !== taskId);
      const updated = { ...task, status: newStatus };

      if (!overTaskId) {
        const lastInColumn = without.filter((t) => t.status === newStatus);
        const others = without.filter((t) => t.status !== newStatus);
        return { tasks: [...others, ...lastInColumn, updated] };
      }

      const overIndex = without.findIndex((t) => t.id === overTaskId);
      if (overIndex === -1) {
        return { tasks: [...without, updated] };
      }
      const next = [...without];
      next.splice(overIndex, 0, updated);
      return { tasks: next };
    }),
}));
