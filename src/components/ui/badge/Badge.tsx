import type { Priority } from "@/types/Todo.type";
import React from "react";

type BadgeProps = {
  status: Priority;
};

const Badge: React.FC<BadgeProps> = ({ status }) => {
  return (
    <div
      className={`text-sm font-semibold ${
        status === "LOW"
          ? "bg-accent-green text-white"
          : status === "MEDIUM"
          ? "bg-accent-yellow"
          : "bg-accent-red text-white"
      }  px-2 rounded-lg`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </div>
  );
};

export default Badge;
