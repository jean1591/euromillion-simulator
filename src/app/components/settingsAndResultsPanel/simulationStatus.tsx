import { useEffect, useState } from "react";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const SimulationStatus = () => {
  const [simulationPercentage, setSimulationPercentage] = useState(0);
  const { numberOfDraws } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { drawsNumber } = useSelector(
    (state: RootState) => state.simulationResults
  );

  useEffect(() => {
    setSimulationPercentage(Math.ceil((drawsNumber / numberOfDraws) * 100));
  }, [drawsNumber]);

  return (
    <div className="overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-dark-accent"
        style={{ width: `${simulationPercentage}%` }}
      />
    </div>
  );
};
