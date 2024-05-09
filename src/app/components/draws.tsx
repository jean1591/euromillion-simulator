import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { DrawResult } from "./drawResult";
import { SimuationSettings } from "../page";
import { generateDraw } from "@/utils/generateDraw";
import { profitsCalculator } from "@/utils/winCalculator";

interface Props {
  results: number;
  setResults: Dispatch<SetStateAction<number>>;
  simulationSettings: SimuationSettings;
}

export const Draws = ({ results, setResults, simulationSettings }: Props) => {
  console.log("🚀 ~ Draws");

  const { drawsPerSecond, isRunning, myNumbers } = simulationSettings;
  const [isClient, setIsClient] = useState<boolean>(false);
  const [draws, setDraws] = useState<number[][]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    /* if (isRunning) {
      intervalId = setInterval(() => {
        const draw = generateDraw();

        setResults(results + profitsCalculator(myNumbers, draw));

        setDraws([draw, ...draws]);
      }, Math.floor(1000 / drawsPerSecond));
    } else {
      return () => clearInterval(intervalId);
    } */

    intervalId = setInterval(() => {
      const draw = generateDraw();

      setResults(results + profitsCalculator(myNumbers, draw));

      setDraws([draw, ...draws]);
    }, Math.floor(1000 / drawsPerSecond));

    return () => clearInterval(intervalId);
  }, [draws, isRunning]);

  return (
    <>
      {isClient ? (
        <>
          {draws.map((draw) => {
            return (
              <DrawResult key={draw.join()} myNumbers={myNumbers} draw={draw} />
            );
          })}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
