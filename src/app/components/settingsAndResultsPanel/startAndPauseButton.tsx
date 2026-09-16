import { SimulationStatus, useSimulationStore } from "@/lib/store";

export const StartAndPauseButton = () => {
  const simulationStatus = useSimulationStore(
    (state) => state.simulationStatus
  );
  const setSimulationStatus = useSimulationStore(
    (state) => state.setSimulationStatus
  );
  const resetSimulationResults = useSimulationStore(
    (state) => state.resetSimulationResults
  );

  const handleOnClick = () => {
    if (simulationStatus === SimulationStatus.Idle) {
      resetSimulationResults();
    }

    setSimulationStatus(setSimulationRunningOrPaused(simulationStatus));
  };

  return (
    <button
      type="button"
      className="rounded-md px-3.5 py-2.5 text-base font-medium shadow-sm bg-light-shade hover:bg-ship-cove-100/50 w-full border border-ship-cove-200"
      onClick={handleOnClick}
    >
      {simulationStatusToMessage[simulationStatus]}
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
