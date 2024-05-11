import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { generateDraw } from "@/utils/generateDraw";

export enum SimulationStatus {
  Idle = "idle",
  Paused = "paused",
  Running = "running",
}

export interface SimulationSettingsState {
  myNumbers: number[];
  numberOfDraws: number;
  numberOfDrawsPerWeek: number;
  numberOfWeeksToPlay: number;
  simulationStatus: SimulationStatus;
}

const initialState: SimulationSettingsState = {
  myNumbers: generateDraw(),
  numberOfDraws: 104,
  numberOfDrawsPerWeek: 2,
  numberOfWeeksToPlay: 52,
  simulationStatus: SimulationStatus.Idle,
};

export const simulationSettingsSlice = createSlice({
  name: "simulationSettings",
  initialState,
  reducers: {
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
    setSimulationStatus: (state, action: PayloadAction<SimulationStatus>) => {
      state.simulationStatus = action.payload;
    },
  },
});

export const {
  setMyNumbers,
  setNumberOfDrawsPerWeek,
  setNumberOfWeeksToPlay,
  setSimulationStatus,
} = simulationSettingsSlice.actions;

export default simulationSettingsSlice.reducer;
