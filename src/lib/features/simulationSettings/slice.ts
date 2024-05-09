import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface SimulationSettingsState {
  drawsPerSecond: number;
  isRunning: boolean;
  myNumbers: number[];
}

const initialState: SimulationSettingsState = {
  drawsPerSecond: 1,
  isRunning: false,
  myNumbers: [1, 2, 3, 4, 5, 6, 7],
};

export const simulationSettingsSlice = createSlice({
  name: "simulationSettings",
  initialState,
  reducers: {
    setDrawsPerSecond: (state, action: PayloadAction<number>) => {
      state.drawsPerSecond = action.payload;
    },
    setMyNumbers: (state, action: PayloadAction<number[]>) => {
      state.myNumbers = action.payload;
    },
    setIsRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
  },
});

export const { setDrawsPerSecond, setMyNumbers, setIsRunning } =
  simulationSettingsSlice.actions;

export default simulationSettingsSlice.reducer;
