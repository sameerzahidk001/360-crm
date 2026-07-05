"use client";

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { useAppStore } from "@/store/app-store";
import { useTaskStore } from "@/store/task-store";
import { PriorityBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatDate, cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types";
import { Calendar, Plus } from "lucide-react";

const columns: { id: TaskStatus; title: string; color: string; bg: string }[] = [
  { id: "todo", title: "To Do", color: "border-t-gray-400", bg: "bg-gray-50 dark:bg-gray-900/30" },
  { id: "in_progress", title: "In Progress", color: "border-t-accent-orange", bg: "bg-accent-orange/5" },
  { id: "in_review", title: "In Review", color: "border-t-orange-300", bg: "bg-orange-50/50" },
  { id: "completed", title: "Completed", color: "border-t-success", bg: "bg-success/5" },
];

function KanbanCardContent({ task, isDragging }: { task: Task; isDragging?: boolean }) {
  return (
    <>
      <p className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">{task.title}</p>
      <p className="text-xs text-text-secondary mt-1.5">{task.projectName}</p>
      <div className="flex items-center justify-between mt-3">
        <PriorityBadge priority={task.priority} />
        {task.assigneeNames[0] && <Avatar name={task.assigneeNames[0]} size="sm" />}
      </div>
      <div className="flex items-center gap-1 mt-2.5 text-xs text-text-secondary">
        <Calendar className="h-3 w-3" />
        {formatDate(task.dueDate, "MMM d")}
      </div>
      {isDragging && <div className="absolute inset-0 rounded-xl ring-2 ring-brand-blue/40" />}
    </>
  );
}

function KanbanCard({ task }: { task: Task }) {
  const setSelectedTask = useAppStore((s) => s.setSelectedTask);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className={cn(
        "relative rounded-xl border border-border bg-surface p-3.5 shadow-sm cursor-grab active:cursor-grabbing",
        "hover:shadow-md hover:border-accent-orange/40 hover:-translate-y-0.5 transition-all duration-200",
        isDragging && "opacity-40 scale-[0.98]"
      )}
      onClick={() => !isDragging && setSelectedTask(task)}
    >
      <KanbanCardContent task={task} />
    </div>
  );
}

function KanbanColumn({ title, color, bg, tasks, status, isOver }: {
  title: string; color: string; bg: string; tasks: Task[]; status: TaskStatus; isOver?: boolean;
}) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col rounded-2xl border border-border min-h-[520px] border-t-4 transition-all duration-200",
        color, bg,
        isOver && "ring-2 ring-accent-orange/40 ring-offset-2 ring-offset-bg-main"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3.5">
        <h3 className="text-sm font-bold text-text-primary">{title}</h3>
        <span className="text-xs font-semibold text-accent-orange bg-accent-orange/10 px-2.5 py-1 rounded-full">{tasks.length}</span>
      </div>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 px-3 pb-3 space-y-2.5 overflow-y-auto scrollbar-thin min-h-[120px]">
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-text-secondary/50 border-2 border-dashed border-border rounded-xl">
              <Plus className="h-5 w-5 mb-1" />
              <span className="text-xs">Drop tasks here</span>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export function KanbanBoard() {
  const tasks = useTaskStore((s) => s.tasks);
  const reorderTasks = useTaskStore((s) => s.reorderTasks);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<TaskStatus | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const columnIds = columns.map((c) => c.id);

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) { setOverColumn(null); return; }
    const col = columnIds.find((id) => id === over.id);
    if (col) { setOverColumn(col); return; }
    const overTask = tasks.find((t) => t.id === over.id);
    setOverColumn(overTask?.status ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverColumn(null);
    if (!over) return;

    const taskId = active.id as string;
    const activeTask = tasks.find((t) => t.id === taskId);
    if (!activeTask) return;

    let targetStatus: TaskStatus = activeTask.status;
    let overTaskId: string | undefined;

    if (columnIds.includes(over.id as TaskStatus)) {
      targetStatus = over.id as TaskStatus;
    } else {
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) {
        targetStatus = overTask.status;
        overTaskId = overTask.id;
      }
    }

    if (targetStatus === activeTask.status && overTaskId && overTaskId !== taskId) {
      const columnTasks = tasks.filter((t) => t.status === targetStatus);
      const oldIndex = columnTasks.findIndex((t) => t.id === taskId);
      const newIndex = columnTasks.findIndex((t) => t.id === overTaskId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(columnTasks, oldIndex, newIndex);
        const others = tasks.filter((t) => t.status !== targetStatus);
        useTaskStore.setState({ tasks: [...others, ...reordered] });
      }
      return;
    }

    if (targetStatus !== activeTask.status || overTaskId) {
      reorderTasks(taskId, targetStatus, overTaskId);
    }
  };

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            title={col.title}
            color={col.color}
            bg={col.bg}
            status={col.id}
            isOver={overColumn === col.id}
            tasks={tasks.filter((t) => t.status === col.id)}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={{ duration: 200, easing: "ease" }}>
        {activeTask && (
          <div className="rounded-xl border-2 border-accent-orange bg-surface p-3.5 shadow-2xl rotate-2 scale-105 cursor-grabbing w-[280px]">
            <KanbanCardContent task={activeTask} isDragging />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
