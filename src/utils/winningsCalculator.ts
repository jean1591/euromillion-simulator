import { baseNumbersOf, starNumbersOf } from "./euromillions";

import { intersection } from "lodash";
import { winningsFor } from "./prizeTiers";

export const winningsCalculator = (myNumbers: number[], draw: number[]) => {
  const winningNumbers = intersection(
    baseNumbersOf(myNumbers),
    baseNumbersOf(draw)
  );
  const winningStars = intersection(
    starNumbersOf(myNumbers),
    starNumbersOf(draw)
  );

  return winningsFor(winningNumbers.length, winningStars.length);
};
