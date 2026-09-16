import { Draws } from "./draws";
import { MAX_RECENT_WINNING_DRAWS, useSimulationStore } from "@/lib/store";
import { Panel } from "../panel";

export const DrawsPanel = () => {
  const winningDrawsCount = useSimulationStore(
    (state) => state.winningDrawsCount
  );

  return (
    <Panel height="h-3/5">
      <div className="flex items-baseline justify-between">
        <p className="text-base font-medium text-left">Tirages gagnants</p>

        {winningDrawsCount > MAX_RECENT_WINNING_DRAWS ? (
          <p className="text-xs text-ship-cove-600">
            {MAX_RECENT_WINNING_DRAWS} derniers sur {winningDrawsCount}
          </p>
        ) : null}
      </div>
      <div className="flex justify-center">
        <div>
          <Draws />
        </div>
      </div>
    </Panel>
  );
};
