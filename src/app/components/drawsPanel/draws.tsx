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
  const { drawsPerSecond, isRunning, myNumbers, numberOfDraws } = useSelector(
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
    if (isRunning && drawsNumber < numberOfDraws) {
      const intervalId = setInterval(() => {
        const draw = generateDraw();
        const winnings = winningsCalculator(myNumbers, draw);

        dispatch(setDrawsNumber());

        if (winnings) {
          dispatch(addToWinnings(winnings));
          dispatch(pushNewDraw(draw));
        }
      }, Math.floor(100));

      return () => clearInterval(intervalId);
    }
  }, [drawsPerSecond, isRunning, drawsNumber]);

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
