import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  addToWinnings,
  pushNewDraw,
} from "@/lib/features/simulationResults/slice";
import { useDispatch, useSelector } from "react-redux";

import { Draw } from "../draw";
import { RootState } from "@/lib/store";
import { generateDraw } from "@/utils/generateDraw";
import { profitsCalculator } from "@/utils/winCalculator";

export const Draws = () => {
  console.log("🚀 ~ Draws");

  const { drawsPerSecond, isRunning, myNumbers } = useSelector(
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

      dispatch(pushNewDraw(draw));
      dispatch(addToWinnings(profitsCalculator(myNumbers, draw)));
    }, Math.floor(1000 / drawsPerSecond));

    return () => clearInterval(intervalId);
  }, [draws, isRunning]);

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
