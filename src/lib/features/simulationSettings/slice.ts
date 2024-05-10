import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { generateDraw } from "@/utils/generateDraw";

export interface SimulationSettingsState {
  drawsPerSecond: number;
  isRunning: boolean;
  myNumbers: number[];
  numberOfDraws: number;
  numberOfDrawsPerWeek: number;
  numberOfWeeksToPlay: number;
}

const initialState: SimulationSettingsState = {
  drawsPerSecond: 1,
  isRunning: false,
  myNumbers: generateDraw(),
  numberOfDraws: 52,
  numberOfDrawsPerWeek: 2,
  numberOfWeeksToPlay: 52,
};

export const simulationSettingsSlice = createSlice({
  name: "simulationSettings",
  initialState,
  reducers: {
    setIsRunning: (state) => {
      state.isRunning = !state.isRunning;
    },
    setDrawsPerSecond: (state, action: PayloadAction<number>) => {
      state.drawsPerSecond = action.payload;
    },
    setMyNumbers: (state, action: PayloadAction<number[]>) => {
      state.myNumbers = action.payload;
    },
    setNumberOfWeeksToPlay: (state, action: PayloadAction<number>) => {
      state.numberOfWeeksToPlay = action.payload;
      state.numberOfDraws =
        state.numberOfWeeksToPlay * state.numberOfDrawsPerWeek;
    },
    setNumberOfDrawsPerWeek: (state, action: PayloadAction<number>) => {
      state.numberOfDrawsPerWeek = action.payload;
      state.numberOfDraws =
        state.numberOfWeeksToPlay * state.numberOfDrawsPerWeek;
    },
  },
});

export const {
  setDrawsPerSecond,
  setIsRunning,
  setMyNumbers,
  setNumberOfDrawsPerWeek,
  setNumberOfWeeksToPlay,
} = simulationSettingsSlice.actions;

export default simulationSettingsSlice.reducer;
