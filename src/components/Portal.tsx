import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

// Resource : https://www.learnbestcoding.com/post/101/how-to-create-a-portal-in-next-js

export const Portal = ({ children }: { children: ReactNode }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>("#portal");
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div
          className={`block fixed left-0 top-0 h-full w-full overflow-auto bg-yellow z-40`}
        >
          {children}
        </div>,
        ref.current
      )
    : null;
};
