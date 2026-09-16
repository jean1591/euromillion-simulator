import { describe, expect, it } from "vitest";

import { generateDraw } from "./generateDraw";

const RUNS = 500;

const baseNumbersOf = (draw: number[]) => draw.slice(0, -2);
const starNumbersOf = (draw: number[]) => draw.slice(-2);

const isSortedAscending = (numbers: number[]) =>
  numbers.every((number, index) => index === 0 || numbers[index - 1] < number);

describe("generateDraw", () => {
  it("returns five base numbers followed by two stars", () => {
    expect(generateDraw()).toHaveLength(7);
  });

  it("draws base numbers between 1 and 50, without repeats, in ascending order", () => {
    for (let run = 0; run < RUNS; run++) {
      const baseNumbers = baseNumbersOf(generateDraw());

      expect(baseNumbers).toHaveLength(5);
      expect(new Set(baseNumbers).size).toBe(5);
      expect(Math.min(...baseNumbers)).toBeGreaterThanOrEqual(1);
      expect(Math.max(...baseNumbers)).toBeLessThanOrEqual(50);
      expect(isSortedAscending(baseNumbers)).toBe(true);
    }
  });

  it("draws stars between 1 and 12, without repeats, in ascending order", () => {
    for (let run = 0; run < RUNS; run++) {
      const starNumbers = starNumbersOf(generateDraw());

      expect(starNumbers).toHaveLength(2);
      expect(new Set(starNumbers).size).toBe(2);
      expect(Math.min(...starNumbers)).toBeGreaterThanOrEqual(1);
      expect(Math.max(...starNumbers)).toBeLessThanOrEqual(12);
      expect(isSortedAscending(starNumbers)).toBe(true);
    }
  });

  it("lets a star repeat a base number, they are drawn from separate pools", () => {
    const draws = Array.from({ length: RUNS }, generateDraw);

    const someDrawRepeatsABaseNumberAsAStar = draws.some((draw) =>
      starNumbersOf(draw).some((star) => baseNumbersOf(draw).includes(star))
    );

    expect(someDrawRepeatsABaseNumberAsAStar).toBe(true);
  });

  it("does not always return the same draw", () => {
    const draws = Array.from({ length: RUNS }, () => generateDraw().join());

    expect(new Set(draws).size).toBeGreaterThan(1);
  });
});
