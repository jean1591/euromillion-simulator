import { useSimulationStore } from "@/lib/store";

export const WeekSelector = () => {
  return (
    <div className="mt-2 flex items-center justify-center gap-x-2">
      <WeekSelectorButton value={10} />
      <WeekSelectorButton value={52} />
      <WeekSelectorButton value={104} />
      <WeekSelectorButton value={208} />
    </div>
  );
};

const WeekSelectorButton = ({ value }: { value: number }) => {
  const addToNumberOfWeeksToPlay = useSimulationStore(
    (state) => state.addToNumberOfWeeksToPlay
  );

  return (
    <button
      type="button"
      className="w-1/6 text-sm font-medium rounded-md p-2 shadow-sm bg-light-shade hover:bg-ship-cove-100/50 border border-ship-cove-200"
      onClick={() => addToNumberOfWeeksToPlay(value)}
    >
      {value}
    </button>
  );
};
