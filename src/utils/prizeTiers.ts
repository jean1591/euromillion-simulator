import {
  BASE_NUMBERS_COUNT,
  HIGHEST_BASE_NUMBER,
  HIGHEST_STAR_NUMBER,
  STAR_NUMBERS_COUNT,
} from "./euromillions";

export const TICKET_PRICE = 2.5;

// Average payouts per tier. The jackpot in particular is an average over
// past draws, not a rule: a real jackpot depends on the rollover and on
// how many tickets share it.
const AVERAGE_WINNINGS: Record<string, number> = {
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
};

const tierKey = (matchedNumbers: number, matchedStars: number) =>
  `${matchedNumbers}+${matchedStars}`;

export const winningsFor = (matchedNumbers: number, matchedStars: number) =>
  AVERAGE_WINNINGS[tierKey(matchedNumbers, matchedStars)] ?? 0;

export const combinations = (poolSize: number, picked: number): number => {
  if (picked < 0 || picked > poolSize) {
    return 0;
  }

  let result = 1;

  for (let index = 0; index < picked; index++) {
    result = (result * (poolSize - index)) / (index + 1);
  }

  return Math.round(result);
};

export const TOTAL_COMBINATIONS =
  combinations(HIGHEST_BASE_NUMBER, BASE_NUMBERS_COUNT) *
  combinations(HIGHEST_STAR_NUMBER, STAR_NUMBERS_COUNT);

// How many of the 139 838 160 possible draws land on exactly this tier:
// the ways to hit `matched` of the numbers you picked, times the ways the
// rest fall outside it, and the same for the stars.
const waysToMatch = (matchedNumbers: number, matchedStars: number) =>
  combinations(BASE_NUMBERS_COUNT, matchedNumbers) *
  combinations(
    HIGHEST_BASE_NUMBER - BASE_NUMBERS_COUNT,
    BASE_NUMBERS_COUNT - matchedNumbers
  ) *
  combinations(STAR_NUMBERS_COUNT, matchedStars) *
  combinations(
    HIGHEST_STAR_NUMBER - STAR_NUMBERS_COUNT,
    STAR_NUMBERS_COUNT - matchedStars
  );

export const oddsAgainst = (matchedNumbers: number, matchedStars: number) =>
  TOTAL_COMBINATIONS / waysToMatch(matchedNumbers, matchedStars);

export interface PrizeTier {
  rank: number;
  matchedNumbers: number;
  matchedStars: number;
  averageWinnings: number;
  oddsAgainst: number;
}

// Ranked by prize rather than by matched numbers, which is how the game
// itself ranks them: three numbers and two stars pays more than four
// numbers alone, even though four numbers alone is the likelier outcome.
export const PRIZE_TIERS: PrizeTier[] = Object.entries(AVERAGE_WINNINGS)
  .sort(([, left], [, right]) => right - left)
  .map(([key, averageWinnings], index) => {
    const [matchedNumbers, matchedStars] = key.split("+").map(Number);

    return {
      rank: index + 1,
      matchedNumbers,
      matchedStars,
      averageWinnings,
      oddsAgainst: oddsAgainst(matchedNumbers, matchedStars),
    };
  });

// Any tier at all, which is what "chances de gagner" means to a player.
export const ODDS_AGAINST_ANY_PRIZE =
  TOTAL_COMBINATIONS /
  PRIZE_TIERS.reduce(
    (ways, tier) => ways + waysToMatch(tier.matchedNumbers, tier.matchedStars),
    0
  );
