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

// Only the most recent winning draws are kept. Everything the results
// card reports is aggregated as it goes, so the list never has to grow
// with the length of the simulation.
export const MAX_RECENT_WINNING_DRAWS = 100;

export interface WinningDraw {
  // The draw's rank in the simulation, unique and stable, used as a key.
  id: number;
  draw: number[];
  winnings: number;
}

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

  drawsNumber: number;
  recentWinningDraws: WinningDraw[];
  winningDrawsCount: number;
  winnings: number;
  biggestWin: number;

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
  drawsNumber: 0,
  recentWinningDraws: [] as WinningDraw[],
  winningDrawsCount: 0,
  winnings: 0,
  biggestWin: 0,
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

      const winningDraws: WinningDraw[] = [];
      let winnings = 0;
      let biggestWin = state.biggestWin;

      for (let index = 0; index < drawsToRun; index++) {
        const draw = generateDraw();
        const amount = winningsCalculator(state.myNumbers, draw);

        if (amount) {
          // Most recent first, matching the order the panel reads in.
          winningDraws.unshift({
            id: state.drawsNumber + index + 1,
            draw,
            winnings: amount,
          });
          winnings += amount;
          biggestWin = Math.max(biggestWin, amount);
        }
      }

      return {
        drawsNumber: state.drawsNumber + drawsToRun,
        recentWinningDraws: [
          ...winningDraws,
          ...state.recentWinningDraws,
        ].slice(0, MAX_RECENT_WINNING_DRAWS),
        winningDrawsCount: state.winningDrawsCount + winningDraws.length,
        winnings: state.winnings + winnings,
        biggestWin,
      };
    }),

  skipToEnd: () => {
    const { numberOfDraws, drawsNumber, runDraws } = useSimulationStore.getState();

    runDraws(numberOfDraws - drawsNumber);
    set({ simulationStatus: SimulationStatus.Idle });
  },

  resetSimulationResults: () => set({ ...emptyResults }),
}));
