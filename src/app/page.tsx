"use client";

import { DrawsPanel } from "./components/drawsPanel/drawsPanel";
import { ResultsCard } from "./components/results/resultsCard";
import { SettingsAndResultsPanel } from "./components/settingsAndResultsPanel/settingsAndResultsPanel";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-normal text-center text-calypso-600">
        Simulateur Euromillions
      </h1>

      <div className="flex items-center justify-center">
        <h2 className="mt-8 text-md sm:text-lg font-normal text-calypso-400 w-full sm:w-2/3 text-center leading-7">
          Visualisez vos parties d'Euromillions, votre argent part vite, vos chances sont faibles 🥲
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 md:gap-10">
        <div>
          <SettingsAndResultsPanel />
          <div className="mt-10">
            <ResultsCard />
          </div>
        </div>
        <DrawsPanel />
      </div>
    </div>
  );
}
