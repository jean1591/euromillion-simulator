import { setNumberOfWeeksToPlay } from "@/lib/features/simulationSettings/slice";
import { useDispatch } from "react-redux";

export const NumberOfWeeksToPlay = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      className="block w-1/3 rounded-md py-1.5 px-2 text-dark-shade  placeholder:text-dark-shade/50 border border-dark-shade/20"
      placeholder="52"
      onChange={(e) => {
        dispatch(setNumberOfWeeksToPlay(parseInt(e.target.value, 10)));
      }}
    />
  );
};
