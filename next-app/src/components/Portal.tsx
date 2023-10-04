import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

// Resource : https://www.learnbestcoding.com/post/101/how-to-create-a-portal-in-next-js

export const Portal = ({
  children,
  showModal,
}: {
  children: ReactNode;
  showModal: boolean;
}) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current && showModal ? (
    createPortal(
      <div
        className={`block fixed left-0 top-0 h-full w-full flex flex-col justify-center overflow-auto bg-black/50 z-40`}
      >
        <div className="relative h-fit w-full "> {children}</div>
      </div>,
      ref.current
    )
  ) : (
    <>{children}</>
  );
};
