import { useEffect, useState } from "react";

import { Switch } from "@headlessui/react";
import { classNames } from "@/utils/classNames";
import { setNumberOfDrawsPerWeek } from "@/lib/features/simulationSettings/slice";
import { useDispatch } from "react-redux";

export const NumberOfDrawsPerWeek = () => {
  const dispatch = useDispatch();

  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    dispatch(setNumberOfDrawsPerWeek(enabled ? 2 : 1));
  }, [enabled]);

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-ship-cove-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
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
