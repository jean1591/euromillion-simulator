import { DrawsPerSecondButton } from "./drawsPerSecondButton";
import { MyNumbers } from "./myNumbers";
import { StartAndPauseSimulationButton } from "./startAndPauseSimulationButton";

export const SimuationSettings = () => {
  console.log("🚀 ~ SimuationSettings");

  return (
    <div>
      <div className="pb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Tirages par seconde</p>
        <DrawsPerSecondButton />
      </div>

      <div className="pb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Vos numéros</p>
        <MyNumbers />
      </div>

      <div className="pb-6 flex items-center justify-between">
        <StartAndPauseSimulationButton />
      </div>
    </div>
  );
};
