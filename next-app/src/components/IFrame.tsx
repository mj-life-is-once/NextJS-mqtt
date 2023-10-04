export const IFrame = ({ src }: { src: string }) => {
  return (
    <div className="absolute overflow-hidden left-0 top-0 h-[960px] w-[1536px]">
      <iframe src={src} className="h-[960px] w-[1536px] border-none" />
    </div>
  );
};
