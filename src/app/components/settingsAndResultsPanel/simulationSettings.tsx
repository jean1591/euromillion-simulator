import { MyNumbers } from "./myNumbers";
import { NumberOfDrawsPerWeek } from "./drawsPerWeek";
import { StartAndPauseButton } from "./startAndPauseButton";
import { WeekSelector } from "./weeksSelector";

export const SimulationSettings = () => {
  return (
    <div>
      <MyNumbers />

      <div className="pt-7">
        <p className="text-base font-medium">Ajouter des semaines</p>
        <WeekSelector />
      </div>

      <div className="pt-7">
        <NumberOfDrawsPerWeek />
      </div>

      <div className="pt-7">
        <StartAndPauseButton />
      </div>
    </div>
  );
};
