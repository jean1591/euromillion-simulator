"use client";

import { DrawsPanel } from "./components/drawsPanel/drawsPanel";
import { ResultsCard } from "./components/results/resultsCard";
import { SettingsAndResultsPanel } from "./components/settingsAndResultsPanel/settingsAndResultsPanel";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-normal text-center">
        Simulateur Euromillions
      </h1>

      <div className="pt-16 grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <div>
          <SettingsAndResultsPanel />
          <ResultsCard />
        </div>
        <DrawsPanel />
      </div>
    </div>
  );
}
