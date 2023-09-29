import { ReactNode, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  onClick,
  className,
  type,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: any;
}) => {
  return (
    <button
      className={twMerge(
        `px-2 py-3 border shadow-md font-extrabold rounded-lg text-sm hover:bg-slate-500 ${
          className ?? ""
        }`
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
