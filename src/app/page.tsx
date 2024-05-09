"use client";

import { useEffect, useState } from "react";

import { DrawsPanel } from "./components/drawsPanel/drawsPanel";
import { SettingsAndResultsPanel } from "./components/settingsAndResultsPanel/settingsAndResultsPanel";

export interface SimuationSettings {
  drawsPerSecond: number;
  isRunning: boolean;
  myNumbers: number[];
}

const initialSettings: SimuationSettings = {
  drawsPerSecond: 1,
  isRunning: false,
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
          <SettingsAndResultsPanel
            settings={settings}
            setSettings={setSettings}
          />

          <DrawsPanel
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
