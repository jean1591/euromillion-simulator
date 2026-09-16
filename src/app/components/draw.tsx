import { classNames } from "@/utils/classNames";

export const Draw = ({
  draw,
  myNumbers,
}: {
  draw: number[];
  myNumbers: number[];
}) => {
  const myBaseNumbers = myNumbers.slice(0, -2);
  const myStarNumbers = myNumbers.slice(-2);

  return (
    <ul className="flex gap-x-2 mt-5">
      {draw.slice(0, -2).map((number) => (
        <Ball
          key={`base-${number}`}
          number={number}
          label={`Numéro ${number}`}
          isMatched={myBaseNumbers.includes(number)}
        />
      ))}

      {draw.slice(-2).map((number) => (
        <Ball
          key={`star-${number}`}
          number={number}
          label={`Étoile ${number}`}
          isMatched={myStarNumbers.includes(number)}
          isStar
        />
      ))}
    </ul>
  );
};

const Ball = ({
  number,
  label,
  isMatched,
  isStar = false,
}: {
  number: number;
  label: string;
  isMatched: boolean;
  isStar?: boolean;
}) => {
  return (
    <li
      aria-label={isMatched ? `${label}, trouvé` : label}
      className={classNames(
        isMatched
          ? "bg-green-200 border-green-700 font-semibold"
          : classNames(isStar ? "bg-ship-cove-100" : "", "border-ship-cove-500"),
        "w-7 h-7 md:w-10 md:h-10 rounded-full flex justify-center items-center border"
      )}
    >
      {number}
    </li>
  );
};
