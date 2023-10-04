import CloseIcon from "@mui/icons-material/Close";
import Draggable from "react-draggable";
import { useRef, useEffect, useState } from "react";
import { useFocus } from "@/contexts/FocusProvider";

export const Popup = ({
  children,
  className,
  title,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClose: () => void;
}) => {
  const nodeRef = useRef(null);
  const { focus } = useFocus();
  const [initPos, setInitPos] = useState({ x: window.innerWidth / 2, y: 100 });

  useEffect(() => {
    const handleResize = () => {
      setInitPos({ x: window.innerWidth / 2, y: 100 });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      disabled={focus}
      bounds="parent"
      defaultPosition={initPos}
    >
      <div
        ref={nodeRef}
        className={`relative rounded-lg p-5 shadow-md ${className ?? ""}`}
      >
        {title && (
          <div className="flex flex-row justify-between mb-5">
            <div className="text-lg font-bold">{title}</div>
            <CloseIcon onClick={onClose} />
          </div>
        )}
        {children}
      </div>
    </Draggable>
  );
};
