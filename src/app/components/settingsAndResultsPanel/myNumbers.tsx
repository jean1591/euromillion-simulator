import { SimulationStatus, useSimulationStore } from "@/lib/store";
import { useEffect, useState } from "react";

import { Draw } from "../draw";
import { LuDices } from "react-icons/lu";
import { NumbersPicker } from "./numbersPicker";

export const MyNumbers = () => {
  const [isPicking, setIsPicking] = useState(false);

  const myNumbers = useSimulationStore((state) => state.myNumbers);
  const setMyNumbers = useSimulationStore((state) => state.setMyNumbers);
  const randomiseMyNumbers = useSimulationStore(
    (state) => state.randomiseMyNumbers
  );
  const simulationStatus = useSimulationStore(
    (state) => state.simulationStatus
  );

  const isEditable = simulationStatus === SimulationStatus.Idle;

  useEffect(() => {
    randomiseMyNumbers();
  }, [randomiseMyNumbers]);

  useEffect(() => {
    if (!isEditable) {
      setIsPicking(false);
    }
  }, [isEditable]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">Vos numéros</p>

        <div className="flex items-center gap-x-1">
          <button
            type="button"
            disabled={!isEditable}
            onClick={randomiseMyNumbers}
            title="Tirer une grille au hasard"
            className="flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-medium text-calypso-500 hover:bg-ship-cove-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
          >
            <LuDices aria-hidden="true" className="h-4 w-4" />
            Au hasard
          </button>

          <button
            type="button"
            disabled={!isEditable}
            onClick={() => setIsPicking((picking) => !picking)}
            className="rounded-md px-3 py-2 text-sm font-medium text-calypso-500 hover:bg-ship-cove-100 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
          >
            {isPicking ? "Fermer" : "Choisir"}
          </button>
        </div>
      </div>

      <Draw myNumbers={[0]} draw={myNumbers} />

      {isPicking ? (
        <NumbersPicker
          myNumbers={myNumbers}
          onCancel={() => setIsPicking(false)}
          onConfirm={(numbers) => {
            setMyNumbers(numbers);
            setIsPicking(false);
          }}
        />
      ) : null}
    </div>
  );
};
