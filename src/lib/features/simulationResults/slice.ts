import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SimulationResultsState {
  draws: number[][];
  drawsNumber: number;
  winningsArray: number[];
  winnings: number;
}

const initialState: SimulationResultsState = {
  draws: [],
  drawsNumber: 0,
  winningsArray: [],
  winnings: 0,
};

export const simulationResultsSlice = createSlice({
  name: "simulationResults",
  initialState,
  reducers: {
    addToWinnings: (state, action: PayloadAction<number>) => {
      state.winnings += action.payload;
    },
    pushNewDraw: (state, action: PayloadAction<number[]>) => {
      state.draws = [action.payload, ...state.draws];
    },
    pushNewWinnings: (state, action: PayloadAction<number>) => {
      state.winningsArray = [action.payload, ...state.winningsArray];
    },
    setDrawsNumber: (state) => {
      state.drawsNumber += 1;
    },
    resetSimulationResults: (state) => {
      state.draws = [];
      state.drawsNumber = 0;
      state.winnings = 0;
    },
  },
});

export const {
  addToWinnings,
  pushNewDraw,
  pushNewWinnings,
  resetSimulationResults,
  setDrawsNumber,
} = simulationResultsSlice.actions;

export default simulationResultsSlice.reducer;
