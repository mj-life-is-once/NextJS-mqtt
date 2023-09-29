import CloseIcon from "@mui/icons-material/Close";

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
  return (
    <div className={`relative rounded-lg p-5 shadow-md ${className ?? ""}`}>
      {title && (
        <div className="flex flex-row justify-between mb-5">
          <div className="text-lg font-bold">{title}</div>
          <CloseIcon onClick={onClose} />
        </div>
      )}
      {children}
    </div>
  );
};
