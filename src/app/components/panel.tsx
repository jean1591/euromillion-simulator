import { classNames } from "@/utils/classNames";

export const Panel = ({
  height = "h-96",
  children,
}: {
  height?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={classNames(
        height,
        "border border-dark-shade/25 bg-light-shade py-10 px-5 rounded-md overflow-y-scroll shadow-lg mb-5"
      )}
    >
      {children}
    </div>
  );
};
