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
  }, [drawsNumber, numberOfDraws]);

  return (
    <div className="overflow-hidden rounded-full bg-light-shade">
      <div
        className="h-2 rounded-full bg-ship-cove-300"
        style={{ width: `${simulationPercentage}%` }}
      />
    </div>
  );
};
