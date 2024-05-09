import { configureStore } from "@reduxjs/toolkit";
import simulationResultsReducer from "./features/simulationResults/slice";
import simulationSettingsReducer from "./features/simulationSettings/slice";

export const store = configureStore({
  reducer: {
    simulationResults: simulationResultsReducer,
    simulationSettings: simulationSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
