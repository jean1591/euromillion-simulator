import { useSimulationStore } from "@/lib/store";

const WEEK_INCREMENTS = [10, 52, 104, 208];

export const WeekSelector = () => {
  const numberOfWeeksToPlay = useSimulationStore(
    (state) => state.numberOfWeeksToPlay
  );
  const addToNumberOfWeeksToPlay = useSimulationStore(
    (state) => state.addToNumberOfWeeksToPlay
  );
  const resetNumberOfWeeksToPlay = useSimulationStore(
    (state) => state.resetNumberOfWeeksToPlay
  );

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-base font-medium">Durée</p>

        <p className="text-base font-semibold tabular-nums text-calypso-600">
          {numberOfWeeksToPlay} semaines
        </p>
      </div>

      <div className="mt-2 flex items-center gap-x-2">
        {WEEK_INCREMENTS.map((weeks) => (
          <button
            key={weeks}
            type="button"
            onClick={() => addToNumberOfWeeksToPlay(weeks)}
            className="flex-1 rounded-md border border-ship-cove-200 bg-light-shade p-2 text-sm font-medium tabular-nums shadow-sm hover:bg-ship-cove-100/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
          >
            +{weeks}
          </button>
        ))}

        <button
          type="button"
          onClick={resetNumberOfWeeksToPlay}
          className="rounded-md px-3 py-2 text-sm font-medium text-calypso-500 hover:bg-ship-cove-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-calypso-500"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
};
