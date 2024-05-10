import { useEffect, useState } from "react";

import { Switch } from "@headlessui/react";
import { setNumberOfDrawsPerWeek } from "@/lib/features/simulationSettings/slice";
import { useDispatch } from "react-redux";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const NumberOfDrawsPerWeek = () => {
  const dispatch = useDispatch();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    dispatch(setNumberOfDrawsPerWeek(enabled ? 2 : 1));
  }, [enabled]);

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-dark-accent" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-dark-shade/10 shadow transition duration-200 ease-in-out bg-white"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};