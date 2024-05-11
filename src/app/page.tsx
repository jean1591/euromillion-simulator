"use client";

import { DrawsPanel } from "./components/drawsPanel/drawsPanel";
import { SettingsAndResultsPanel } from "./components/settingsAndResultsPanel/settingsAndResultsPanel";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
      <SettingsAndResultsPanel />
      <DrawsPanel />
    </div>
  );
}
