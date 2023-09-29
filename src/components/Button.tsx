import { ReactNode, MouseEventHandler } from "react";
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
      className={`px-2 py-3 border shadow-md bg-slate-800 font-extrabold rounded-lg text-sm hover:bg-slate-500 ${
        className ?? ""
      }`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
