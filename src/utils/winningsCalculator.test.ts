import { describe, expect, it } from "vitest";

import { winningsCalculator } from "./winningsCalculator";

const draw = (baseNumbers: number[], stars: number[]) => [
  ...baseNumbers,
  ...stars,
];

describe("winningsCalculator", () => {
  it("pays the jackpot for five numbers and two stars", () => {
    const myNumbers = draw([1, 2, 3, 4, 5], [1, 2]);

    expect(winningsCalculator(myNumbers, myNumbers)).toBe(17000000);
  });

  it("pays nothing when nothing matches", () => {
    expect(
      winningsCalculator(draw([1, 2, 3, 4, 5], [1, 2]), draw([6, 7, 8, 9, 10], [3, 4]))
    ).toBe(0);
  });

  it("pays nothing for a single number, however many stars match", () => {
    expect(
      winningsCalculator(draw([1, 2, 3, 4, 5], [1, 2]), draw([1, 6, 7, 8, 9], [1, 2]))
    ).toBe(0);
  });

  it("pays the lowest tier for two numbers and no star", () => {
    expect(
      winningsCalculator(draw([1, 2, 3, 4, 5], [1, 2]), draw([1, 2, 6, 7, 8], [3, 4]))
    ).toBe(4);
  });

  it("counts stars separately from base numbers", () => {
    const myNumbers = draw([1, 2, 3, 4, 5], [11, 12]);
    const drawn = draw([1, 2, 3, 40, 50], [11, 12]);

    expect(winningsCalculator(myNumbers, drawn)).toBe(57);
  });

  it("does not credit a base number that only appears among the stars", () => {
    const myNumbers = draw([1, 2, 3, 4, 5], [11, 12]);
    const drawn = draw([6, 7, 8, 9, 10], [1, 2]);

    expect(winningsCalculator(myNumbers, drawn)).toBe(0);
  });

  it("ignores the order the numbers are given in", () => {
    const winnings = winningsCalculator(
      draw([5, 4, 3, 2, 1], [2, 1]),
      draw([1, 2, 3, 4, 5], [1, 2])
    );

    expect(winnings).toBe(17000000);
  });
});
