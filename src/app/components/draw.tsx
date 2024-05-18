import { classNames } from "@/utils/classNames";

export const Draw = ({
  draw,
  myNumbers,
}: {
  draw: number[];
  myNumbers: number[];
}) => {
  const baseNumbers = myNumbers.slice(0, -2);
  const starNumbers = myNumbers.slice(-2);

  return (
    <div className="flex gap-x-2 mt-5">
      {draw.slice(0, -2).map((num) => (
        <p
          key={num}
          className={classNames(
            baseNumbers.includes(num) ? "bg-green-200" : "",
            "w-7 h-7 md:w-10 md:h-10 rounded-full flex justify-center items-center border border-ship-cove-500"
          )}
        >
          {num}
        </p>
      ))}

      {draw.slice(-2).map((num) => (
        <p
          key={num}
          className={classNames(
            starNumbers.includes(num) ? "bg-green-200" : "bg-ship-cove-100",
            "w-7 h-7 md:w-10 md:h-10 rounded-full flex justify-center items-center border border-ship-cove-500"
          )}
        >
          {num}
        </p>
      ))}
    </div>
  );
};
