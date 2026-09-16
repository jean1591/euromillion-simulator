import { SimulationStatus, useSimulationStore } from "@/lib/store";

export const StartAndPauseButton = () => {
  const simulationStatus = useSimulationStore(
    (state) => state.simulationStatus
  );
  const drawsNumber = useSimulationStore((state) => state.drawsNumber);
  const numberOfDraws = useSimulationStore((state) => state.numberOfDraws);
  const setSimulationStatus = useSimulationStore(
    (state) => state.setSimulationStatus
  );
  const resetSimulationResults = useSimulationStore(
    (state) => state.resetSimulationResults
  );
  const skipToEnd = useSimulationStore((state) => state.skipToEnd);

  const isIdle = simulationStatus === SimulationStatus.Idle;
  const hasDrawsLeft = drawsNumber < numberOfDraws;

  const handleOnClick = () => {
    if (isIdle) {
      resetSimulationResults();
    }

    setSimulationStatus(setSimulationRunningOrPaused(simulationStatus));
  };

  return (
    <div className="flex items-center gap-x-2">
      <button
        type="button"
        onClick={handleOnClick}
        className="flex-1 rounded-md border border-ship-cove-200 bg-light-shade px-3.5 py-2.5 text-base font-medium shadow-sm hover:bg-ship-cove-100/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
      >
        {simulationStatusToMessage[simulationStatus]}
      </button>

      <button
        type="button"
        onClick={skipToEnd}
        disabled={isIdle || !hasDrawsLeft}
        title="Résoudre les tirages restants immédiatement"
        className="rounded-md px-3.5 py-2.5 text-base font-medium text-calypso-500 hover:bg-ship-cove-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
      >
        Terminer
      </button>
    </div>
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
