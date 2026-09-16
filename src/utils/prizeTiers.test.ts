import {
  ODDS_AGAINST_ANY_PRIZE,
  PRIZE_TIERS,
  TOTAL_COMBINATIONS,
  combinations,
  oddsAgainst,
  winningsFor,
} from "./prizeTiers";
import { describe, expect, it } from "vitest";

describe("combinations", () => {
  it("counts the draws of the French EuroMillions grid", () => {
    expect(combinations(50, 5)).toBe(2118760);
    expect(combinations(12, 2)).toBe(66);
    expect(TOTAL_COMBINATIONS).toBe(139838160);
  });

  it("returns nothing for an impossible pick", () => {
    expect(combinations(5, 6)).toBe(0);
    expect(combinations(5, -1)).toBe(0);
  });
});

describe("oddsAgainst", () => {
  it("matches the published odds for the jackpot", () => {
    expect(oddsAgainst(5, 2)).toBe(139838160);
  });

  // If every outcome is accounted for exactly once, no tier is double
  // counted and none is missing.
  it("partitions every possible draw across the eighteen outcomes", () => {
    let outcomes = 0;

    for (let matchedNumbers = 0; matchedNumbers <= 5; matchedNumbers++) {
      for (let matchedStars = 0; matchedStars <= 2; matchedStars++) {
        outcomes += TOTAL_COMBINATIONS / oddsAgainst(matchedNumbers, matchedStars);
      }
    }

    expect(outcomes).toBe(TOTAL_COMBINATIONS);
  });

  it("puts the chance of winning anything at about one in fourteen", () => {
    expect(ODDS_AGAINST_ANY_PRIZE).toBeGreaterThan(13);
    expect(ODDS_AGAINST_ANY_PRIZE).toBeLessThan(14);
  });
});

describe("PRIZE_TIERS", () => {
  it("ranks three numbers and two stars above four numbers alone", () => {
    const rankOf = (matchedNumbers: number, matchedStars: number) =>
      PRIZE_TIERS.find(
        (tier) =>
          tier.matchedNumbers === matchedNumbers &&
          tier.matchedStars === matchedStars
      )?.rank;

    expect(rankOf(3, 2)).toBeLessThan(rankOf(4, 0) ?? 0);
    expect(oddsAgainst(3, 2)).toBeGreaterThan(oddsAgainst(4, 0));
  });

  it("runs from the jackpot down to the smallest prize", () => {
    expect(PRIZE_TIERS).toHaveLength(12);
    expect(PRIZE_TIERS[0]).toMatchObject({
      rank: 1,
      matchedNumbers: 5,
      matchedStars: 2,
    });
    expect(PRIZE_TIERS.at(-1)).toMatchObject({
      rank: 12,
      matchedNumbers: 2,
      matchedStars: 0,
    });
  });

  it("is ordered by decreasing prize", () => {
    PRIZE_TIERS.forEach((tier, index) => {
      if (index === 0) {
        return;
      }

      expect(tier.averageWinnings).toBeLessThan(
        PRIZE_TIERS[index - 1].averageWinnings
      );
    });
  });
});

describe("winningsFor", () => {
  it("pays nothing for a tier outside the table", () => {
    expect(winningsFor(1, 1)).toBe(0);
    expect(winningsFor(0, 0)).toBe(0);
  });
});
