import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import type { Priority } from "@/types/Todo.type";

interface FormFilterProps {
  onSearch: (value: string) => void;
  onPriorityChange: (priority: Priority | null) => void;
}

const FormFilter: React.FC<FormFilterProps> = ({
  onSearch,
  onPriorityChange,
}) => {
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(
    null
  );

  const handleClear = () => {
    setSelectedPriority(null);
    onPriorityChange(null);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          className="py-2 px-12 rounded-2xl border border-[#DEDCDC] dark:border-neutral-900 outline-none w-full text-sm"
          placeholder="Search"
          onChange={(e) => {
            onSearch(e.target.value);
          }}
        />
        <img
          src="./search-lg.svg"
          alt="search"
          className="absolute w-5 top-1/5 left-4 brightness-0 contrast-100 dark:brightness-100 dark:contrast-100"
        />
      </div>

      <DropdownMenu.Root>
        {!selectedPriority ? (
          <DropdownMenu.Trigger asChild>
            <div className="flex justify-between items-center hover:bg-neutral-100 hover:dark:bg-neutral-900 border border-[#DEDCDC] dark:border-neutral-900 p-2 h-full gap-2 rounded-2xl cursor-pointer">
              <img
                src="./Filter.svg"
                alt="filter"
                className="w-4 brightness-0 contrast-100 dark:brightness-100 dark:contrast-100"
              />
              <div className="hidden text-sm md:inline me-3">Priority</div>
            </div>
          </DropdownMenu.Trigger>
        ) : (
          <button
            className="flex justify-between items-center hover:bg-neutral-100 hover:dark:bg-neutral-900 border border-[#DEDCDC] dark:border-neutral-900 p-2 h-full gap-2 rounded-2xl cursor-pointer"
            onClick={handleClear}
          >
            <img
              src="./x-close.svg"
              alt="close"
              className="w-4 brightness-0 contrast-100 dark:brightness-100 dark:contrast-100"
            />
            <div className="hidden text-sm md:inline me-3">Clear</div>
          </button>
        )}
        <DropdownMenu.Content
          sideOffset={4}
          className="bg-white dark:bg-black border border-[#DEDCDC] dark:border-neutral-900 rounded-lg shadow-md p-1 min-w-[120px]"
        >
          <DropdownMenu.Item
            className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer rounded-md text-accent-green"
            onSelect={() => {
              setSelectedPriority("LOW");
              onPriorityChange("LOW");
            }}
          >
            Low
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer rounded-md text-accent-yellow"
            onSelect={() => {
              setSelectedPriority("MEDIUM");
              onPriorityChange("MEDIUM");
            }}
          >
            Medium
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer rounded-md text-accent-red"
            onSelect={() => {
              setSelectedPriority("HIGH");
              onPriorityChange("HIGH");
            }}
          >
            High
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default FormFilter;
