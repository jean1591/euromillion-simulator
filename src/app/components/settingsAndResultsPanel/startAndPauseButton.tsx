import {
  SimulationStatus,
  setSimulationStatus,
} from "@/lib/features/simulationSettings/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "@/lib/store";
import { resetSimulationResults } from "@/lib/features/simulationResults/slice";

export const StartAndPauseButton = () => {
  const [message, setMessage] = useState(
    simulationStatusToMessage[SimulationStatus.Idle]
  );
  const { simulationStatus } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage(simulationStatusToMessage[simulationStatus]);
  }, [simulationStatus]);

  const handleOnClick = () => {
    if (simulationStatus === SimulationStatus.Idle) {
      console.log("Reseting simulation");
      resetSimulationResults();
    }

    dispatch(
      setSimulationStatus(setSimulationRunningOrPaused(simulationStatus))
    );
  };

  return (
    <button
      type="button"
      className="rounded-md bg-white px-3.5 py-2.5 text-base font-medium text-dark-shade shadow-sm hover:bg-dark-shade/10 w-full border border-dark-shade/20"
      onClick={handleOnClick}
    >
      {message}
    </button>
  );
};

const simulationStatusToMessage: Record<SimulationStatus, string> = {
  [SimulationStatus.Idle]: "Lancer la simulation",
  [SimulationStatus.Paused]: "Reprendre",
  [SimulationStatus.Running]: "Mettre en pause",
};

const setSimulationRunningOrPaused = (
  simulationStatus: SimulationStatus
): SimulationStatus => {
  return [SimulationStatus.Idle, SimulationStatus.Paused].includes(
    simulationStatus
  )
    ? SimulationStatus.Running
    : SimulationStatus.Paused;
};
