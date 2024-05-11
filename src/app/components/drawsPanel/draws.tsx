import {
  SimulationStatus,
  setSimulationStatus,
} from "@/lib/features/simulationSettings/slice";
import {
  addToWinnings,
  pushNewDraw,
  setDrawsNumber,
} from "@/lib/features/simulationResults/slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Draw } from "../draw";
import { RootState } from "@/lib/store";
import { generateDraw } from "@/utils/generateDraw";
import { winningsCalculator } from "@/utils/winningsCalculator";

export const Draws = () => {
  const { myNumbers, numberOfDraws, simulationStatus } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { draws, drawsNumber } = useSelector(
    (state: RootState) => state.simulationResults
  );
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState<boolean>(false);

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

        dispatch(setDrawsNumber());

        if (winnings) {
          dispatch(addToWinnings(winnings));
          dispatch(pushNewDraw(draw));
        }
      }, 50);

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
          {draws.map((draw) => {
            return <Draw key={draw.join()} myNumbers={myNumbers} draw={draw} />;
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
