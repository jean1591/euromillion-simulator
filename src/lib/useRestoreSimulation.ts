import { PERSIST_KEY, SimulationStatus, useSimulationStore } from "./store";

import { useEffect } from "react";

// Runs once the client has taken over: restores whatever the last visit
// left behind, or draws a fresh grid when there is nothing to restore.
export const useRestoreSimulation = () => {
  useEffect(() => {
    let hadPersistedState = false;

    try {
      hadPersistedState = window.localStorage.getItem(PERSIST_KEY) !== null;
    } catch {
      hadPersistedState = false;
    }

    Promise.resolve(useSimulationStore.persist.rehydrate()).then(() => {
      if (!hadPersistedState) {
        useSimulationStore.getState().randomiseMyNumbers();
        return;
      }

      const { drawsNumber, numberOfDraws } = useSimulationStore.getState();
      const isMidRun = drawsNumber > 0 && drawsNumber < numberOfDraws;

      useSimulationStore.setState({
        simulationStatus: isMidRun
          ? SimulationStatus.Paused
          : SimulationStatus.Idle,
      });
    });
  }, []);
};
