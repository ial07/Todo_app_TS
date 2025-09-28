import React from "react";

type ButtonCompProps = {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  loading?: boolean;
  iconAdd?: boolean;
};

const ButtonComp: React.FC<ButtonCompProps> = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  fullWidth = false,
  loading = false,
  iconAdd = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading} // disable if loading
      className={`
        text-white cursor-pointer rounded-lg
        w-full ${!fullWidth && "md:w-[300px]"} h-[48px] p-2
        bg-primary hover:bg-blue-800
        disabled:opacity-50 disabled:cursor-not-allowed
        inset-shadow-white
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {iconAdd && <img src="./Add.svg" alt="add" className="w-5" />}
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Loading...
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default ButtonComp;
