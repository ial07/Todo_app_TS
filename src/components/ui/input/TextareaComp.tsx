import React, { type TextareaHTMLAttributes } from "react";

type TextareaCompProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string; // optional error message
};

const TextareaComp: React.FC<TextareaCompProps> = ({
  label,
  className,
  error,
  disabled,
  ...rest
}) => {
  return (
    <div className="relative flex flex-col gap-1 mb-5 w-full">
      {/* Textarea */}
      <textarea
        {...rest}
        disabled={disabled}
        id={`floatingTextarea-${label}`}
        className={`peer border pt-6 pb-1 px-3 pr-10 rounded-lg  
          placeholder-transparent focus:border-neutral-600 dark:focus:border-neutral-400 outline-none
          dark:bg-neutral-950 border-[#DEDCDC] dark:border-neutral-900
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
        htmlFor={`floatingTextarea-${label}`}
        className="absolute top-3 left-3 text-neutral-600 dark:text-neutral-500 text-xs transition-all 
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-3 peer-focus:text-xs peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500"
      >
        {label}
      </label>

      {/* Error text */}
      {error && <span className="text-xs text-red-500 mt-1 ms-1">{error}</span>}
    </div>
  );
};

export default TextareaComp;
