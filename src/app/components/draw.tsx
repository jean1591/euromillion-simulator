import { baseNumbersOf, starNumbersOf } from "@/utils/euromillions";

import { classNames } from "@/utils/classNames";

export const Draw = ({
  draw,
  myNumbers,
}: {
  draw: number[];
  myNumbers: number[];
}) => {
  const myBaseNumbers = baseNumbersOf(myNumbers);
  const myStarNumbers = starNumbersOf(myNumbers);

  return (
    <ul className="flex gap-x-2 mt-5">
      {baseNumbersOf(draw).map((number) => (
        <Ball
          key={`base-${number}`}
          number={number}
          label={`Numéro ${number}`}
          isMatched={myBaseNumbers.includes(number)}
        />
      ))}

      {starNumbersOf(draw).map((number) => (
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
