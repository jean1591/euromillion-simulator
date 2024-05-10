import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { generateDraw } from "@/utils/generateDraw";

export interface SimulationSettingsState {
  drawsPerSecond: number;
  myNumbers: number[];
  numberOfDrawsPerWeek: number;
  numberOfWeeksToPlay: number;
}

const initialState: SimulationSettingsState = {
  drawsPerSecond: 1,
  myNumbers: generateDraw(),
  numberOfDrawsPerWeek: 1,
  numberOfWeeksToPlay: 52,
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
    setNumberOfWeeksToPlay: (state, action: PayloadAction<number>) => {
      state.numberOfWeeksToPlay = action.payload;
    },
    setNumberOfDrawsPerWeek: (state, action: PayloadAction<number>) => {
      state.numberOfDrawsPerWeek = action.payload;
    },
  },
});

export const {
  setDrawsPerSecond,
  setMyNumbers,
  setNumberOfDrawsPerWeek,
  setNumberOfWeeksToPlay,
} = simulationSettingsSlice.actions;

export default simulationSettingsSlice.reducer;
