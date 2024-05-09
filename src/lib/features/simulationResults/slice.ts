import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SimulationResultsState {
  draws: number[][];
  drawsNumber: number;
  winnings: number;
}

const initialState: SimulationResultsState = {
  draws: [],
  drawsNumber: 0,
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
    setDrawsNumber: (state) => {
      state.drawsNumber += 1;
    },
  },
});

export const { addToWinnings, pushNewDraw, setDrawsNumber } =
  simulationResultsSlice.actions;

export default simulationResultsSlice.reducer;
