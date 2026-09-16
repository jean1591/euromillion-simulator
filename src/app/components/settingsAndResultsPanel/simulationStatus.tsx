import { useSimulationStore } from "@/lib/store";

export const SimulationStatus = () => {
  const numberOfDraws = useSimulationStore((state) => state.numberOfDraws);
  const drawsNumber = useSimulationStore((state) => state.drawsNumber);

  const simulationPercentage = Math.ceil((drawsNumber / numberOfDraws) * 100);

  return (
    <div className="overflow-hidden rounded-full bg-light-shade">
      <div
        className="h-2 rounded-full bg-ship-cove-300"
        style={{ width: `${simulationPercentage}%` }}
      />
    </div>
  );
};
