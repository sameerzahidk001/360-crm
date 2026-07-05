import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TimeLog {
  id: string;
  employee: string;
  taskId: string;
  task: string;
  start: string;
  end: string;
  duration: string;
  durationMs: number;
  notes: string;
}

interface TimerState {
  isRunning: boolean;
  startedAt: number | null;
  accumulatedMs: number;
  selectedTaskId: string | null;
  timeLogs: TimeLog[];
  start: (taskId: string) => void;
  stop: (employeeName: string, taskTitle: string) => TimeLog | null;
  pause: () => void;
  reset: () => void;
  getElapsedMs: () => number;
  addManualLog: (log: Omit<TimeLog, "id">) => void;
}

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

const defaultLogs: TimeLog[] = [
  { id: "tl1", employee: "Ahmed Raza", taskId: "tk2", task: "Implement authentication module", start: "09:00 AM", end: "11:30 AM", duration: "02:30:00", durationMs: 9000000, notes: "JWT setup" },
  { id: "tl2", employee: "Ahmed Raza", taskId: "tk4", task: "Create Kanban board component", start: "01:00 PM", end: "04:00 PM", duration: "03:00:00", durationMs: 10800000, notes: "Drag and drop setup" },
];

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      isRunning: false,
      startedAt: null,
      accumulatedMs: 0,
      selectedTaskId: null,
      timeLogs: defaultLogs,
      start: (taskId) =>
        set({
          isRunning: true,
          startedAt: Date.now(),
          selectedTaskId: taskId,
        }),
      pause: () => {
        const { isRunning, startedAt, accumulatedMs } = get();
        if (!isRunning || !startedAt) return;
        set({
          isRunning: false,
          startedAt: null,
          accumulatedMs: accumulatedMs + (Date.now() - startedAt),
        });
      },
      stop: (employeeName, taskTitle) => {
        const { isRunning, startedAt, accumulatedMs, selectedTaskId } = get();
        if (!selectedTaskId) return null;

        const extra = isRunning && startedAt ? Date.now() - startedAt : 0;
        const totalMs = accumulatedMs + extra;
        if (totalMs < 1000) {
          get().reset();
          return null;
        }

        const end = new Date();
        const start = new Date(end.getTime() - totalMs);
        const log: TimeLog = {
          id: `tl-${Date.now()}`,
          employee: employeeName,
          taskId: selectedTaskId,
          task: taskTitle,
          start: formatTime(start),
          end: formatTime(end),
          duration: formatDuration(totalMs),
          durationMs: totalMs,
          notes: "",
        };

        set((s) => ({
          isRunning: false,
          startedAt: null,
          accumulatedMs: 0,
          selectedTaskId: null,
          timeLogs: [log, ...s.timeLogs],
        }));

        return log;
      },
      reset: () =>
        set({
          isRunning: false,
          startedAt: null,
          accumulatedMs: 0,
        }),
      getElapsedMs: () => {
        const { isRunning, startedAt, accumulatedMs } = get();
        if (isRunning && startedAt) {
          return accumulatedMs + (Date.now() - startedAt);
        }
        return accumulatedMs;
      },
      addManualLog: (log) =>
        set((s) => ({
          timeLogs: [{ ...log, id: `tl-${Date.now()}` }, ...s.timeLogs],
        })),
    }),
    {
      name: "360-timer-store",
      partialize: (s) => ({
        timeLogs: s.timeLogs,
        isRunning: s.isRunning,
        startedAt: s.startedAt,
        accumulatedMs: s.accumulatedMs,
        selectedTaskId: s.selectedTaskId,
      }),
    }
  )
);

export { formatDuration };
