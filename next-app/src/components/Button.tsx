import { ReactNode, MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  onClick,
  className,
  type,
  disabled,
}: {
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: any;
  disabled?: boolean;
}) => {
  const buttonClass = disabled
    ? twMerge(
        `px-2 py-3 border shadow-md font-extrabold rounded-lg text-sm text-gray-600 border-gray-600 ${
          className ?? ""
        }`
      )
    : twMerge(
        `px-2 py-3 border shadow-md font-extrabold rounded-lg text-sm hover:bg-slate-500 ${
          className ?? ""
        }`
      );
  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
