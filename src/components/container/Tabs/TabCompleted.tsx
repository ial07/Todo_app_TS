import React from "react";
import TodoList from "../TodoList";
import { useTodos, useUpdateTodo } from "@/hooks/useTodos";
import { isToday } from "@/lib/utils";
import type { Priority } from "@/types/Todo.type";

interface TabCompletedProps {
  search: string;
  priority: Priority | null;
}

const TabCompleted: React.FC<TabCompletedProps> = ({ priority, search }) => {
  // hooks
  const { data, isLoading } = useTodos({
    completed: true,
    sort: "createdAt",
    order: "asc",
  });
  const updateTodoMutation = useUpdateTodo();

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
      <div className="flex items-center gap-2">
        <h1 className="display-xs font-bold">Completed</h1>
        <div className="px-3 py-1 bg-[#DEDCDC] dark:bg-neutral-900 rounded-4xl text-xs font-bold">
          <span>{data?.todos.length} item</span>
        </div>
      </div>

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
          filteredTodos?.map((todo) => (
            <TodoList
              key={todo.id}
              id={todo.id}
              task={todo.title} // ✅ use title (not task)
              priority={todo.priority}
              date={todo.date}
              completed={todo.completed}
              onToggle={(id, checked) =>
                updateTodoMutation.mutate({ id, todo: { completed: checked } })
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TabCompleted;
