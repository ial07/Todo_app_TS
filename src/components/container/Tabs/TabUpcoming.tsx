import React, { Suspense, useState } from "react";
import TodoList from "../TodoList";
import DateNavigation from "../DateNavigation";
import * as Tabs from "@radix-ui/react-tabs";
import dayjs, { Dayjs } from "dayjs";
import { useTodos, useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos";
import type { TodoSchema } from "@/lib/validation/todo.validation";
import { toast } from "react-toastify";
import type { Priority } from "@/types/Todo.type";
import TodoDialog from "../TodoDialog";

interface TabUpcomingProps {
  search: string;
  priority: Priority | null;
}

const TabUpcoming: React.FC<TabUpcomingProps> = ({ search, priority }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs()); // today
  // hooks
  const { data, isLoading } = useTodos({
    completed: false,
    sort: "createdAt",
    order: "asc",
  });
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<
    ({ id: string } & Partial<TodoSchema>) | null
  >(null);

  // 7 days window (3 before, today, 3 after)
  const days: Dayjs[] = Array.from({ length: 7 }, (_, i) =>
    currentDate.add(i - 3, "day")
  );

  const goPrev = () => setCurrentDate((d) => d.subtract(1, "day"));
  const goNext = () => setCurrentDate((d) => d.add(1, "day"));

  const label = currentDate.isSame(dayjs(), "day")
    ? "Today"
    : currentDate.format("MMM D");

  const todos = data?.todos ?? [];

  const filteredTodos = todos.filter((todo) => {
    const matchesDate = dayjs(todo.date).isSame(currentDate, "day");
    const matchesSearch = search
      ? todo.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesPriority = priority ? todo.priority === priority : true;

    return matchesDate && matchesSearch && matchesPriority;
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="display-xs font-bold">Upcoming</h1>
            <div className="px-3 py-1 bg-[#DEDCDC] dark:bg-neutral-900 rounded-4xl text-xs font-bold">
              <span>{filteredTodos.length} item</span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-4">
            {label}
          </p>
        </div>

        <DateNavigation
          hasPrev
          hasNext
          onPrev={goPrev}
          onNext={goNext}
          label={label}
        />
      </div>

      <Tabs.Root
        value={currentDate.format("YYYY-MM-DD")}
        onValueChange={(val) => setCurrentDate(dayjs(val))}
      >
        <Tabs.List className="relative flex gap-2 pb-4 border-b border-b-[#DEDCDC] dark:border-b-neutral-900 overflow-hidden">
          {days.map((day) => {
            const value = day.format("YYYY-MM-DD");
            const isActive = day.isSame(currentDate, "day");

            return (
              <Tabs.Trigger
                key={value}
                value={value}
                className={`flex items-center px-2 cursor-pointer
                  ${
                    isActive
                      ? "text-black dark:text-white"
                      : "text-neutral-600 dark:text-neutral-500"
                  }`}
              >
                {day.format("ddd")}
                <span
                  className={`mx-2 rounded-lg w-6 h-6 flex justify-center items-center
                    ${isActive && "bg-primary text-white"}`}
                >
                  {day.format("D")}
                </span>
                {isActive && (
                  <div className="absolute border border-b-[#0C4BCA] dark:border-b-[#0C4BCA] w-15 bottom-0"></div>
                )}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
      </Tabs.Root>

      <div className="mt-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : filteredTodos.length === 0 ? (
          search ? (
            <p className="font-semibold text-center">
              Try a different keyword.
            </p>
          ) : (
            <p className="font-semibold text-center">Nothing to do yet!</p>
          )
        ) : (
          filteredTodos.map((todo) => (
            <TodoList
              key={todo.id}
              id={todo.id}
              task={todo.title}
              priority={todo.priority}
              date={todo.date}
              completed={todo.completed}
              onToggle={(id, checked) =>
                updateTodoMutation.mutate({ id, todo: { completed: checked } })
              }
              onEdit={(id) => {
                const selected = filteredTodos.find((t) => t.id === id);
                if (selected) {
                  setEditingTodo(selected);
                  setIsDialogOpen(true);
                }
              }}
              onDelete={(id) =>
                deleteTodoMutation.mutate(id, {
                  onSuccess: () => toast.success("Task removed"),
                })
              }
            />
          ))
        )}
      </div>
      {!search && (
        <div className="mt-5 flex justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <TodoDialog
              isOpen={isDialogOpen}
              setIsOpen={(open) => {
                if (!open) setEditingTodo(null);
                setIsDialogOpen(open);
              }}
              editingTodo={editingTodo}
              onSuccess={(isEdit) => {
                toast.success(isEdit ? "Changes saved" : "Task Added!");
              }}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default TabUpcoming;
