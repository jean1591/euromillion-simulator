import { create } from "zustand";
import { generateDraw } from "@/utils/generateDraw";

// Rendered as-is on the server so the first paint matches the hydrated
// markup; randomiseMyNumbers replaces it once the client has taken over.
export const DEFAULT_MY_NUMBERS = [7, 14, 21, 28, 35, 3, 9];

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

  draws: number[][];
  drawsNumber: number;
  winnings: number;
  winningsArray: number[];

  setMyNumbers: (myNumbers: number[]) => void;
  randomiseMyNumbers: () => void;
  setNumberOfWeeksToPlay: (numberOfWeeksToPlay: number) => void;
  addToNumberOfWeeksToPlay: (weeks: number) => void;
  setNumberOfDrawsPerWeek: (numberOfDrawsPerWeek: number) => void;
  setSimulationStatus: (simulationStatus: SimulationStatus) => void;
  recordDraw: (draw: number[], winnings: number) => void;
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
  numberOfDraws: 104,
  numberOfDrawsPerWeek: 2,
  numberOfWeeksToPlay: 52,
  simulationStatus: SimulationStatus.Idle,
  ...emptyResults,

  setMyNumbers: (myNumbers) => set({ myNumbers }),

  randomiseMyNumbers: () => set({ myNumbers: generateDraw() }),

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

  setNumberOfDrawsPerWeek: (numberOfDrawsPerWeek) =>
    set((state) => ({
      numberOfDrawsPerWeek,
      numberOfDraws: state.numberOfWeeksToPlay * numberOfDrawsPerWeek,
    })),

  setSimulationStatus: (simulationStatus) => set({ simulationStatus }),

  recordDraw: (draw, winnings) =>
    set((state) =>
      winnings
        ? {
            drawsNumber: state.drawsNumber + 1,
            draws: [draw, ...state.draws],
            winnings: state.winnings + winnings,
            winningsArray: [winnings, ...state.winningsArray],
          }
        : { drawsNumber: state.drawsNumber + 1 }
    ),

  resetSimulationResults: () => set({ ...emptyResults }),
}));
