import { twMerge } from "tailwind-merge";
export const IFrame = ({
  src,
  targetDisplay,
  className,
}: {
  src: string;
  targetDisplay?: string;
  className?: string;
}) => {
  return (
    <>
      {targetDisplay === "system" ? (
        <div
          className={
            "absolute overflow-hidden left-0 top-0 h-[960px] w-[1536px]"
          }
        >
          <iframe src={src} className={`h-[960px] w-[1536px] border-none`} />
        </div>
      ) : (
        <div
          className={twMerge(
            `absolute overflow-hidden left-0 top-0 h-full w-full ${
              className ?? ""
            }`
          )}
        >
          <iframe src={src} className={`h-full w-full border-none`} />
        </div>
      )}
    </>
  );
};
