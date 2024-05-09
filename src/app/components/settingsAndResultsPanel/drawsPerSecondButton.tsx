import { setDrawsPerSecond } from "@/lib/features/simulationSettings/slice";
import { useDispatch } from "react-redux";

export const DrawsPerSecondButton = () => {
  const dispatch = useDispatch();

  return (
    <span className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className="relative inline-flex items-center justify-center rounded-l-md w-12 px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
        onClick={() => dispatch(setDrawsPerSecond(1))}
      >
        1
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center justify-center w-12 px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
        onClick={() => dispatch(setDrawsPerSecond(3))}
      >
        3
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center justify-center w-12 px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
        onClick={() => dispatch(setDrawsPerSecond(10))}
      >
        10
      </button>
      <button
        type="button"
        className="relative -ml-px inline-flex items-center justify-center rounded-r-md w-12 px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
        onClick={() => dispatch(setDrawsPerSecond(100))}
      >
        100
      </button>
    </span>
  );
};
