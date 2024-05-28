import { classNames } from "@/utils/classNames";

export const Panel = ({
  height,
  children,
}: {
  height?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(
        height ? height : "",
        "border border-ship-cove-200 bg-light-shade py-10 px-5 rounded-md overflow-y-scroll shadow-lg"
      )}
    >
      {children}
    </div>
  );
};
