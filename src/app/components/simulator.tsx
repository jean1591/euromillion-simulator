"use client";

import { DrawsPanel } from "./drawsPanel/drawsPanel";
import { ResultsCard } from "./results/resultsCard";
import { SettingsAndResultsPanel } from "./settingsAndResultsPanel/settingsAndResultsPanel";
import { useRestoreSimulation } from "@/lib/useRestoreSimulation";

export const Simulator = () => {
  useRestoreSimulation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10">
      <div>
        <SettingsAndResultsPanel />
        <div className="mt-10">
          <ResultsCard />
        </div>
      </div>
      <DrawsPanel />
    </div>
  );
};
