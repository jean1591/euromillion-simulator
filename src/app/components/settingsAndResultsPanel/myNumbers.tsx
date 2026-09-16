import { Draw } from "../draw";
import { useEffect } from "react";
import { useSimulationStore } from "@/lib/store";

export const MyNumbers = () => {
  const myNumbers = useSimulationStore((state) => state.myNumbers);
  const randomiseMyNumbers = useSimulationStore(
    (state) => state.randomiseMyNumbers
  );

  useEffect(() => {
    randomiseMyNumbers();
  }, [randomiseMyNumbers]);

  return (
    <div className="-mt-5">
      <Draw myNumbers={[0]} draw={myNumbers} />
    </div>
  );
};
