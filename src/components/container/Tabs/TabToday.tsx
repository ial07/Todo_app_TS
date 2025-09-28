import React, { Suspense, useState } from "react";
import TodoList from "../TodoList";
import { useTodos, useUpdateTodo, useDeleteTodo } from "@/hooks/useTodos";
import type { TodoSchema } from "../../../lib/validation/todo.validation";
import { toast } from "react-toastify";
import { formatToday, isToday } from "@/lib/utils";
import type { Priority } from "@/types/Todo.type";
import TodoDialog from "../TodoDialog";

interface TabTodayProps {
  search: string;
  priority: Priority | null;
}

const TabToday: React.FC<TabTodayProps> = ({ priority, search }) => {
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

  const todayTodos = data?.todos.filter((todo) => isToday(todo.date)) || [];

  const filteredTodos = todayTodos.filter((todo) => {
    const matchesSearch = search
      ? todo.title.toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesPriority = priority ? todo.priority === priority : true;

    return matchesSearch && matchesPriority;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2">
        <h1 className="display-xs font-bold">Today</h1>
        <div className="px-3 py-1 bg-[#DEDCDC] dark:bg-neutral-900 rounded-4xl text-xs font-bold">
          <span>{todayTodos.length} item</span>
        </div>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-4">
        {formatToday()}
      </p>

      {/* List */}
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
                const selected = todayTodos.find((t) => t.id === id);
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

      {/* Dialog */}
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

export default TabToday;
