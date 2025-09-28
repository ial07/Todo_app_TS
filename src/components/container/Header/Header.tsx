import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const Header: React.FC = () => {
  const { logout, user } = useAuth();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="px-4 md:px-30 py-5 flex items-center justify-between border-b border-b-[#DEDCDC] dark:border-b-neutral-900 mb-10">
      <h1>
        <span className="inline md:hidden display-xs font-bold">To Do</span>
        <span className="hidden md:inline display-sm font-bold">To Do</span>
      </h1>

      <div className="flex gap-2 items-center">
        <DropdownMenu.Root open={open} onOpenChange={setOpen}>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-1 cursor-pointer">
              <span className="text-sm md:text-md">{user?.name}</span>
              <img
                src={open ? "./chevron-up.svg" : "./chevron-down.svg"}
                alt={open ? "chevron-up" : "chevron-down"}
                className="brightness-0 contrast-100 dark:brightness-100 dark:contrast-100 cursor-pointer"
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            sideOffset={4}
            className="bg-white dark:bg-black border border-[#DEDCDC] dark:border-neutral-900 rounded-lg shadow-md p-1 min-w-[120px]"
          >
            <DropdownMenu.Item
              onClick={() => logout()}
              className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-900 cursor-pointer rounded-md"
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  );
};

export default Header;
