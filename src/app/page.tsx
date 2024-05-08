"use client";

import { useEffect, useState } from "react";

import { SimuationSettings as SimuationSettingsComponent } from "./components/simuationSettings";
import { SimulationResults } from "./components/SimulationResults";

export interface SimuationSettings {
  drawsPerSecond: number;
  myNumbers: number[];
}

const initialSettings: SimuationSettings = {
  drawsPerSecond: 1,
  myNumbers: [1, 2, 3, 4, 5, 6, 7],
};

export default function Home() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [settings, setSettings] = useState<SimuationSettings>(initialSettings);
  const [results, setResults] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="grid grid-cols-2 gap-20">
          <div>
            <SimuationSettingsComponent setSettings={setSettings} />
            <div>{results}</div>
          </div>

          <SimulationResults
            results={results}
            setResults={setResults}
            simulationSettings={settings}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
