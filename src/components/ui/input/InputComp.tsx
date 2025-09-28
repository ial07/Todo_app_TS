import React, { type InputHTMLAttributes, useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

type InputCompProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string; // optional error message
};

const InputComp: React.FC<InputCompProps> = ({
  label,
  className,
  error,
  disabled,
  type,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const isDate = type === "date";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative flex flex-col gap-1 mb-5 w-full">
      {/* Input */}
      <input
        {...rest}
        disabled={disabled}
        id={`floatingInput-${label}`}
        type={inputType}
        className={`peer border pt-6 pb-1 px-3 pr-10 rounded-lg dark:bg-neutral-950 border-[#DEDCDC] dark:border-neutral-900
          placeholder-transparent focus:border-neutral-600 dark:focus:border-neutral-400 outline-none
           ${
             isDate
               ? "appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
               : ""
           }
          ${
            disabled
              ? "bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed opacity-70"
              : ""
          }
          ${className ?? ""}
        `}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />

      {/* Label */}
      <label
        htmlFor={`floatingInput-${label}`}
        className="absolute top-3 left-3 text-neutral-600 dark:text-neutral-500 text-xs transition-all 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-3 peer-focus:text-xs peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500"
      >
        {label}
      </label>

      {/* Password toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-500 cursor-pointer"
          tabIndex={-1}
        >
          {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </button>
      )}

      {/* Custom date icon */}
      {isDate && (
        <img
          src="./calendar.svg"
          alt="calendar"
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none brightness-0 contrast-100 dark:brightness-100 dark:contrast-100"
        />
      )}

      {/* Error text */}
      {error && <span className="text-xs text-red-500 mt-1 ms-1">{error}</span>}
    </div>
  );
};

export default InputComp;
