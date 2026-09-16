import { SPEEDS, useSimulationStore } from "@/lib/store";

import { classNames } from "@/utils/classNames";

export const SpeedSelector = () => {
  const speed = useSimulationStore((state) => state.speed);
  const setSpeed = useSimulationStore((state) => state.setSpeed);

  return (
    <div className="flex items-center justify-between">
      <p className="text-base font-medium">Vitesse</p>

      <div
        role="group"
        aria-label="Vitesse de la simulation"
        className="flex items-center gap-x-1 rounded-md border border-ship-cove-200 bg-light-shade p-1"
      >
        {SPEEDS.map((availableSpeed) => (
          <button
            key={availableSpeed}
            type="button"
            aria-pressed={availableSpeed === speed}
            onClick={() => setSpeed(availableSpeed)}
            className={classNames(
              availableSpeed === speed
                ? "bg-calypso-500 text-light-shade"
                : "text-calypso-500 hover:bg-ship-cove-100",
              "rounded px-3 py-1 text-sm font-medium tabular-nums transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
            )}
          >
            ×{availableSpeed}
          </button>
        ))}
      </div>
    </div>
  );
};
