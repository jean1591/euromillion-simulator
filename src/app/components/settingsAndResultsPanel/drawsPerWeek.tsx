import { Switch } from "@headlessui/react";
import { classNames } from "@/utils/classNames";
import { useSimulationStore } from "@/lib/store";

export const NumberOfDrawsPerWeek = () => {
  const numberOfDrawsPerWeek = useSimulationStore(
    (state) => state.numberOfDrawsPerWeek
  );
  const setNumberOfDrawsPerWeek = useSimulationStore(
    (state) => state.setNumberOfDrawsPerWeek
  );

  const enabled = numberOfDrawsPerWeek === 2;

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <Switch.Label className="text-base font-medium">
        {enabled ? "2 tirages par semaine" : "1 tirage par semaine"}
      </Switch.Label>

      <Switch
        checked={enabled}
        onChange={(checked: boolean) => setNumberOfDrawsPerWeek(checked ? 2 : 1)}
        className={classNames(
          enabled ? "bg-ship-cove-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-calypso-500 focus-visible:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow transition duration-200 ease-in-out bg-light-shade"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};
