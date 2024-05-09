import { Dispatch, SetStateAction } from "react";

import { Draws } from "./draws";
import { SimuationSettings } from "../page";

interface Props {
  results: number;
  setResults: Dispatch<SetStateAction<number>>;
  simulationSettings: SimuationSettings;
}

export const SimulationResults = ({
  results,
  setResults,
  simulationSettings,
}: Props) => {
  return (
    <div>
      <p className="pb-6 text-lg font-semibold">Tirages</p>
      <Draws
        results={results}
        setResults={setResults}
        simulationSettings={simulationSettings}
      />
    </div>
  );
};
