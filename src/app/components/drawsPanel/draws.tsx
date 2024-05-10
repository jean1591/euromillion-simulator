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
  const { drawsPerSecond, myNumbers } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { draws } = useSelector((state: RootState) => state.simulationResults);
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const draw = generateDraw();
      const winnings = winningsCalculator(myNumbers, draw);

      dispatch(addToWinnings(winnings));
      dispatch(setDrawsNumber());

      if (winnings) {
        dispatch(pushNewDraw(draw));
      }
    }, Math.floor(1000 / drawsPerSecond));

    return () => clearInterval(intervalId);
  }, [draws]);

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
