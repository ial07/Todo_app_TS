import React, { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Header from "@/components/container/Header";
import FormFilter from "@/components/container/FormFilter";
import {
  TabToday,
  TabUpcoming,
  TabCompleted,
} from "@/components/container/Tabs";
import { useTheme } from "@/hooks/useTheme";
import type { Priority } from "@/types/Todo.type";

const Home: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority | null>(null);
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center h-dvh px-6">
        <div className="w-full md:w-150">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h1 className="font-bold">
                <span className="inline md:hidden text-xl">
                  What’s on Your Plan Today?
                </span>
                <span className="hidden md:inline display-sm">
                  What’s on Your Plan Today?
                </span>
              </h1>
              <p className="text-sm md:text-md text-neutral-600 md:text-neutral-500 mt-2">
                Your productivity starts now.
              </p>
            </div>

            <div className="flex justify-between h-fit bg-[#FAFAFA] dark:bg-neutral-950 border border-[#DEDCDC] dark:border-[#181D27] p-2 gap-2 rounded-2xl">
              <div
                className={`${
                  !darkMode && "bg-primary"
                } p-2 rounded-xl cursor-pointer`}
                onClick={() => toggleDarkMode(true)}
              >
                <img src="./sun.svg" alt="sun" className="w-4 " />
              </div>
              <div
                className={`${
                  darkMode && "bg-primary"
                } p-2 rounded-xl cursor-pointer`}
                onClick={() => toggleDarkMode(false)}
              >
                <img
                  src="./moon-02.svg"
                  alt="moon"
                  className="w-4 contrast-0 brightness-100 dark:brightness-100 dark:contrast-100 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <FormFilter onSearch={setSearch} onPriorityChange={setPriority} />

          <Tabs.Root defaultValue="tab1" className="my-5">
            <Tabs.List className="grid grid-cols-3 bg-[#FAFAFA] dark:bg-neutral-950 py-2 gap-2 rounded-lg border border-[#DEDCDC] dark:border-neutral-900">
              <Tabs.Trigger
                value="tab1"
                className="cursor-pointer flex rounded-lg justify-center items-center h-8 md:h-9 text-sm data-[state=active]:font-semibold 
                 data-[state=active]:bg-[#0C4BCA] data-[state=active]:text-white"
              >
                Today
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tab2"
                className="cursor-pointer flex rounded-lg justify-center items-center h-8 md:h-9 text-sm data-[state=active]:font-semibold 
                 data-[state=active]:bg-[#0C4BCA] data-[state=active]:text-white"
              >
                Upcoming
              </Tabs.Trigger>
              <Tabs.Trigger
                value="tab3"
                className="cursor-pointer flex rounded-lg justify-center items-center h-8 md:h-9 text-sm data-[state=active]:font-semibold 
                 data-[state=active]:bg-[#0C4BCA] data-[state=active]:text-white"
              >
                Completed
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1" className="py-4">
              <TabToday search={search} priority={priority} />
            </Tabs.Content>
            <Tabs.Content value="tab2" className="py-4">
              <TabUpcoming search={search} priority={priority} />
            </Tabs.Content>
            <Tabs.Content value="tab3" className="py-4">
              <TabCompleted search={search} priority={priority} />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default Home;
