export const BASE_NUMBERS_COUNT = 5;
export const STAR_NUMBERS_COUNT = 2;

export const HIGHEST_BASE_NUMBER = 50;
export const HIGHEST_STAR_NUMBER = 12;

export const baseNumbersOf = (grid: number[]) =>
  grid.slice(0, -STAR_NUMBERS_COUNT);

export const starNumbersOf = (grid: number[]) =>
  grid.slice(-STAR_NUMBERS_COUNT);

export const range = (highest: number) =>
  Array.from({ length: highest }, (_, index) => index + 1);
