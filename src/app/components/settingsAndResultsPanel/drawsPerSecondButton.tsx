import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/lib/store";
import { setDrawsPerSecond } from "@/lib/features/simulationSettings/slice";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const DrawsPerSecondButton = () => {
  return (
    <span className="flex">
      <Button value={1} />
      <Button value={3} />
      <Button value={10} />
      <Button value={100} />
    </span>
  );
};

const Button = ({ value }: { value: number }) => {
  const { drawsPerSecond } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const dispatch = useDispatch();

  return (
    <button
      type="button"
      className={classNames(
        value === drawsPerSecond
          ? "bg-dark-accent/50 hover:bg-dark-accent/80"
          : "",
        "relative -ml-px inline-flex items-center justify-center w-12 px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
      )}
      onClick={() => dispatch(setDrawsPerSecond(value))}
    >
      {value}
    </button>
  );
};
