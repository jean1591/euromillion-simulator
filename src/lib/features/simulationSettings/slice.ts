import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { generateDraw } from "@/utils/generateDraw";

export interface SimulationSettingsState {
  drawsPerSecond: number;
  myNumbers: number[];
}

const initialState: SimulationSettingsState = {
  drawsPerSecond: 1,
  myNumbers: generateDraw(),
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
  },
});

export const { setDrawsPerSecond, setMyNumbers } =
  simulationSettingsSlice.actions;

export default simulationSettingsSlice.reducer;
