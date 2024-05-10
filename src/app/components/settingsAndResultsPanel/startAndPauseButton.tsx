import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { setIsRunning } from "@/lib/features/simulationSettings/slice";

export const StartAndPauseButton = () => {
  const { isRunning } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-dark-shade shadow-sm hover:bg-dark-shade/10 w-full border border-dark-shade/20"
      onClick={() => dispatch(setIsRunning())}
    >
      {isRunning ? "Mettre en pause" : "Lancer la simulation"}
    </button>
  );
};
