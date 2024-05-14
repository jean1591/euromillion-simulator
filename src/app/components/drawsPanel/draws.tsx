import {
  SimulationStatus,
  setSimulationStatus,
} from "@/lib/features/simulationSettings/slice";
import {
  incrementDrawNumber,
  pushNewDraw,
  pushNewWinnings,
} from "@/lib/features/simulationResults/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { DrawAndWinnings } from "./drawsAndWinnings";
import { RootState } from "@/lib/store";
import { generateDraw } from "@/utils/generateDraw";
import { winningsCalculator } from "@/utils/winningsCalculator";

export const Draws = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  const { myNumbers, numberOfDraws, simulationStatus } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { draws, drawsNumber, winningsArray } = useSelector(
    (state: RootState) => state.simulationResults
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      simulationStatus === SimulationStatus.Running &&
      drawsNumber < numberOfDraws
    ) {
      const intervalId = setInterval(() => {
        const draw = generateDraw();
        const winnings = winningsCalculator(myNumbers, draw);

        dispatch(incrementDrawNumber());

        if (winnings) {
          dispatch(pushNewDraw(draw));
          dispatch(pushNewWinnings(winnings));
        }
      }, 25);

      return () => clearInterval(intervalId);
    }
  }, [simulationStatus, drawsNumber]);

  useEffect(() => {
    if (drawsNumber === numberOfDraws) {
      dispatch(setSimulationStatus(SimulationStatus.Idle));
    }
  }, [drawsNumber]);

  return (
    <>
      {isClient ? (
        <>
          {draws.map((draw, index) => {
            return (
              <DrawAndWinnings
                key={draw.join()}
                myNumbers={myNumbers}
                draw={draw}
                winnings={winningsArray[index]}
              />
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
