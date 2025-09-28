import React, { type SelectHTMLAttributes } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectCompProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: Option[];
  error?: string;
};

const SelectComp: React.FC<SelectCompProps> = ({
  label,
  options,
  className,
  error,
  disabled,
  ...rest
}) => {
  return (
    <div className="relative flex flex-col gap-1 mb-5 w-full">
      {/* Select */}
      <select
        {...rest}
        disabled={disabled}
        id={`floatingSelect-${label}`}
        className={`peer border pt-6 pb-1 px-3 pr-10 rounded-lg 
          focus:border-neutral-600 dark:focus:border-neutral-400 outline-none
          dark:bg-neutral-950 border-[#DEDCDC] dark:border-neutral-900
          appearance-none
          ${
            disabled
              ? "bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed opacity-70"
              : ""
          }
          ${className ?? ""}
        `}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Label */}
      <label
        htmlFor={`floatingSelect-${label}`}
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

export default SelectComp;
