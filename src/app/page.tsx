"use client";

import { DrawsPanel } from "./components/drawsPanel/drawsPanel";
import { SettingsAndResultsPanel } from "./components/settingsAndResultsPanel/settingsAndResultsPanel";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-20">
      <SettingsAndResultsPanel />
      <DrawsPanel />
    </div>
  );
}
