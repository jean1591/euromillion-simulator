import {
  SimulationStatus,
  TICK_INTERVAL_MS,
  useSimulationStore,
} from "@/lib/store";

import { DrawAndWinnings } from "./drawsAndWinnings";
import { useEffect } from "react";

export const Draws = () => {
  const myNumbers = useSimulationStore((state) => state.myNumbers);
  const numberOfDraws = useSimulationStore((state) => state.numberOfDraws);
  const simulationStatus = useSimulationStore(
    (state) => state.simulationStatus
  );
  const speed = useSimulationStore((state) => state.speed);
  const draws = useSimulationStore((state) => state.draws);
  const drawsNumber = useSimulationStore((state) => state.drawsNumber);
  const winningsArray = useSimulationStore((state) => state.winningsArray);
  const runDraws = useSimulationStore((state) => state.runDraws);
  const setSimulationStatus = useSimulationStore(
    (state) => state.setSimulationStatus
  );

  // runDraws reads the current state on every tick, so the interval does
  // not have to be torn down and rebuilt each time a draw lands.
  useEffect(() => {
    if (simulationStatus !== SimulationStatus.Running) {
      return;
    }

    const intervalId = setInterval(() => runDraws(speed), TICK_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [simulationStatus, speed, runDraws]);

  useEffect(() => {
    if (
      simulationStatus === SimulationStatus.Running &&
      drawsNumber >= numberOfDraws
    ) {
      setSimulationStatus(SimulationStatus.Idle);
    }
  }, [simulationStatus, drawsNumber, numberOfDraws, setSimulationStatus]);

  return (
    <>
      {draws.map((draw, index) => (
        <DrawAndWinnings
          key={draw.join()}
          myNumbers={myNumbers}
          draw={draw}
          winnings={winningsArray[index]}
        />
      ))}
    </>
  );
};
