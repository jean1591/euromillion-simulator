import { SimulationStatus, useSimulationStore } from "@/lib/store";
import { useEffect } from "react";

import { DrawAndWinnings } from "./drawsAndWinnings";
import { generateDraw } from "@/utils/generateDraw";
import { winningsCalculator } from "@/utils/winningsCalculator";

export const Draws = () => {
  const myNumbers = useSimulationStore((state) => state.myNumbers);
  const numberOfDraws = useSimulationStore((state) => state.numberOfDraws);
  const simulationStatus = useSimulationStore(
    (state) => state.simulationStatus
  );
  const draws = useSimulationStore((state) => state.draws);
  const drawsNumber = useSimulationStore((state) => state.drawsNumber);
  const winningsArray = useSimulationStore((state) => state.winningsArray);
  const recordDraw = useSimulationStore((state) => state.recordDraw);
  const setSimulationStatus = useSimulationStore(
    (state) => state.setSimulationStatus
  );

  useEffect(() => {
    if (
      simulationStatus === SimulationStatus.Running &&
      drawsNumber < numberOfDraws
    ) {
      const intervalId = setInterval(() => {
        const draw = generateDraw();

        recordDraw(draw, winningsCalculator(myNumbers, draw));
      }, 25);

      return () => clearInterval(intervalId);
    }
  }, [simulationStatus, drawsNumber, numberOfDraws, myNumbers, recordDraw]);

  useEffect(() => {
    if (drawsNumber === numberOfDraws) {
      setSimulationStatus(SimulationStatus.Idle);
    }
  }, [drawsNumber, numberOfDraws, setSimulationStatus]);

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
