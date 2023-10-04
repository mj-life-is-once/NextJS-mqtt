import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export const Card = ({
  children,
  className,
  title,
}: {
  children: ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <div
      className={twMerge(
        `relative rounded-lg p-5 shadow-md ${className ?? ""}`
      )}
    >
      {title && (
        <div className="flex flex-row justify-between mb-5">
          <div className="text-lg font-bold">{title}</div>
        </div>
      )}
      {children}
    </div>
  );
};
