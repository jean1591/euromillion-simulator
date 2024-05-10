import { intersection } from "lodash";

export const winningsCalculator = (myNumbers: number[], draw: number[]) => {
  const myNumbersWithoutStars = myNumbers.slice(0, -2);
  const myNumbersStars = myNumbers.slice(-2);

  const drawWithoutStars = draw.slice(0, -2);
  const drawStars = draw.slice(-2);

  const winningNumbers = intersection(myNumbersWithoutStars, drawWithoutStars);
  const winningStars = intersection(myNumbersStars, drawStars);

  return winningsMap[`${winningNumbers.length}+${winningStars.length}`];
};

const winningsMap: Record<string, number> = {
  "5+2": 17000000,
  "5+1": 200738,
  "5+0": 20851,
  "4+2": 1299,
  "4+1": 120,
  "4+0": 39,
  "3+2": 57,
  "3+1": 11,
  "3+0": 9,
  "2+2": 14,
  "2+1": 6,
  "2+0": 4,
  "1+2": 0,
  "1+1": 0,
  "1+0": 0,
  "0+2": 0,
  "0+1": 0,
  "0+0": 0,
};
