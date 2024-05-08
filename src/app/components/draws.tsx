import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { DrawResult } from "./drawResult";
import { generateDraw } from "@/utils/generateDraw";
import { profitsCalculator } from "@/utils/winCalculator";

interface Props {
  drawsPerSecond: number;
  myNumbers: number[];
  results: number;
  setResults: Dispatch<SetStateAction<number>>;
}

export const Draws = ({
  drawsPerSecond,
  myNumbers,
  results,
  setResults,
}: Props) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [draws, setDraws] = useState<number[][]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const draw = generateDraw();

      setResults(results + profitsCalculator(myNumbers, draw));

      setDraws([draw, ...draws]);
    }, Math.floor(1000 / drawsPerSecond));

    return () => clearInterval(intervalId);
  }, [draws]);

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
