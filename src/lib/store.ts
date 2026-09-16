import { create } from "zustand";
import { generateDraw } from "@/utils/generateDraw";
import { winningsCalculator } from "@/utils/winningsCalculator";

// Rendered as-is on the server so the first paint matches the hydrated
// markup; randomiseMyNumbers replaces it once the client has taken over.
export const DEFAULT_MY_NUMBERS = [7, 14, 21, 28, 35, 3, 9];

export const DEFAULT_WEEKS_TO_PLAY = 52;
export const DEFAULT_DRAWS_PER_WEEK = 2;

// Draws resolved per tick. One tick every TICK_INTERVAL_MS, so the
// simulation reads as an animation at speed 1 and as a fast-forward above.
export const SPEEDS = [1, 10, 100] as const;
export const TICK_INTERVAL_MS = 25;

export enum SimulationStatus {
  Idle = "idle",
  Paused = "paused",
  Running = "running",
}

interface SimulationState {
  myNumbers: number[];
  numberOfDraws: number;
  numberOfDrawsPerWeek: number;
  numberOfWeeksToPlay: number;
  simulationStatus: SimulationStatus;
  speed: number;

  draws: number[][];
  drawsNumber: number;
  winnings: number;
  winningsArray: number[];

  setMyNumbers: (myNumbers: number[]) => void;
  randomiseMyNumbers: () => void;
  setNumberOfWeeksToPlay: (numberOfWeeksToPlay: number) => void;
  addToNumberOfWeeksToPlay: (weeks: number) => void;
  setNumberOfDrawsPerWeek: (numberOfDrawsPerWeek: number) => void;
  resetNumberOfWeeksToPlay: () => void;
  setSimulationStatus: (simulationStatus: SimulationStatus) => void;
  setSpeed: (speed: number) => void;
  runDraws: (count: number) => void;
  skipToEnd: () => void;
  resetSimulationResults: () => void;
}

const emptyResults = {
  draws: [] as number[][],
  drawsNumber: 0,
  winnings: 0,
  winningsArray: [] as number[],
};

export const useSimulationStore = create<SimulationState>()((set) => ({
  myNumbers: DEFAULT_MY_NUMBERS,
  numberOfDraws: DEFAULT_WEEKS_TO_PLAY * DEFAULT_DRAWS_PER_WEEK,
  numberOfDrawsPerWeek: DEFAULT_DRAWS_PER_WEEK,
  numberOfWeeksToPlay: DEFAULT_WEEKS_TO_PLAY,
  simulationStatus: SimulationStatus.Idle,
  speed: SPEEDS[0],
  ...emptyResults,

  // Results computed against another grid no longer describe this one.
  setMyNumbers: (myNumbers) => set({ myNumbers, ...emptyResults }),

  randomiseMyNumbers: () => set({ myNumbers: generateDraw(), ...emptyResults }),

  setNumberOfWeeksToPlay: (numberOfWeeksToPlay) =>
    set((state) => ({
      numberOfWeeksToPlay,
      numberOfDraws: numberOfWeeksToPlay * state.numberOfDrawsPerWeek,
    })),

  addToNumberOfWeeksToPlay: (weeks) =>
    set((state) => {
      const numberOfWeeksToPlay = state.numberOfWeeksToPlay + weeks;

      return {
        numberOfWeeksToPlay,
        numberOfDraws: numberOfWeeksToPlay * state.numberOfDrawsPerWeek,
      };
    }),

  resetNumberOfWeeksToPlay: () =>
    set((state) => ({
      numberOfWeeksToPlay: DEFAULT_WEEKS_TO_PLAY,
      numberOfDraws: DEFAULT_WEEKS_TO_PLAY * state.numberOfDrawsPerWeek,
    })),

  setNumberOfDrawsPerWeek: (numberOfDrawsPerWeek) =>
    set((state) => ({
      numberOfDrawsPerWeek,
      numberOfDraws: state.numberOfWeeksToPlay * numberOfDrawsPerWeek,
    })),

  setSimulationStatus: (simulationStatus) => set({ simulationStatus }),

  setSpeed: (speed) => set({ speed }),

  // Resolves up to `count` draws in a single update. Batching matters:
  // at speed 100 the per-draw version would have queued 100 renders for
  // one frame's worth of simulation.
  runDraws: (count) =>
    set((state) => {
      const drawsToRun = Math.min(count, state.numberOfDraws - state.drawsNumber);

      if (drawsToRun <= 0) {
        return {};
      }

      const winningDraws: number[][] = [];
      const winningAmounts: number[] = [];
      let winnings = 0;

      for (let index = 0; index < drawsToRun; index++) {
        const draw = generateDraw();
        const amount = winningsCalculator(state.myNumbers, draw);

        if (amount) {
          winningDraws.unshift(draw);
          winningAmounts.unshift(amount);
          winnings += amount;
        }
      }

      return {
        drawsNumber: state.drawsNumber + drawsToRun,
        draws: [...winningDraws, ...state.draws],
        winnings: state.winnings + winnings,
        winningsArray: [...winningAmounts, ...state.winningsArray],
      };
    }),

  skipToEnd: () => {
    const { numberOfDraws, drawsNumber, runDraws } = useSimulationStore.getState();

    runDraws(numberOfDraws - drawsNumber);
    set({ simulationStatus: SimulationStatus.Idle });
  },

  resetSimulationResults: () => set({ ...emptyResults }),
}));
