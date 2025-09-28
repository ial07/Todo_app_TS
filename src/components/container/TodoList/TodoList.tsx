import React from "react";
import Badge from "@/components/ui/badge";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Priority } from "@/types/Todo.type";

type TodoListProps = {
  id: string;
  task: string;
  priority: Priority;
  date: string;
  completed: boolean;
  onToggle: (id: string, checked: boolean) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

const TodoList: React.FC<TodoListProps> = ({
  id,
  task,
  priority,
  date,
  completed,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-4 bg-[#FAFAFA] dark:bg-neutral-950 p-3 rounded-2xl mb-3 border border-[#DEDCDC] dark:border-neutral-900">
      {/* Checkbox */}
      <div className="relative">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(id, e.target.checked)}
          className="peer w-5 h-5 border border-[#DEDCDC] dark:border-neutral-900 rounded-sm cursor-pointer appearance-none checked:bg-[#0C4BCA] checked:border-[#0C4BCA]"
        />
        {/* custom white checkmark */}
        <svg
          className="absolute w-4 h-4 text-white pointer-events-none hidden peer-checked:block ml-0.5 mt-0.5 top-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 
   4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Task info */}
      <div className="w-full">
        <h2
          className={`text-md font-semibold ${
            completed ? "line-through text-gray-400" : ""
          }`}
        >
          {task}
        </h2>
        <div className="flex gap-6">
          <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-500">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <Badge status={priority} />
        </div>
      </div>

      {/* More Menu */}
      {!completed && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="cursor-pointer">
              <img
                src="./More.svg"
                alt="more"
                className="w-6 brightness-0 contrast-100 dark:brightness-100 dark:contrast-100"
              />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content
            sideOffset={1}
            className="bg-white dark:bg-black border border-[#DEDCDC] dark:border-neutral-900 rounded-lg shadow-md p-1 z-10 min-w-[120px]"
          >
            <DropdownMenu.Item
              onClick={() => onEdit?.(id)}
              className="flex gap-1 px-3 py-2 text-sm hover:bg-gray-100 hover:dark:bg-neutral-900 cursor-pointer rounded-md"
            >
              <img
                src="./pencil-02.svg"
                alt="more"
                className="w-4 brightness-0 contrast-100 dark:brightness-100 dark:contrast-100 cursor-pointer"
              />
              <span>Edit</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => onDelete?.(id)}
              className="flex gap-1 px-3 py-2 text-sm text-accent-red hover:bg-red-100 cursor-pointer rounded-md"
            >
              <img src="./trash-red.svg" alt="trash" className="w-4 h-4" />
              <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </div>
  );
};

export default TodoList;
