import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { setIsRunning } from "@/lib/features/simulationSettings/slice";

export const StartAndPauseSimulationButton = () => {
  const isRunning = useSelector(
    (state: RootState) => state.simulationSettings.isRunning
  );
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className="relative inline-flex items-center justify-center rounded-md w-full px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
      onClick={() => dispatch(setIsRunning())}
    >
      {isRunning ? (
        <p>Mettre en pause (ne fonctionne pas)</p>
      ) : (
        <p>Lancer la simulation</p>
      )}
    </button>
  );
};
