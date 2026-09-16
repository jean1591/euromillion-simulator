import { MyNumbers } from "./myNumbers";
import { NumberOfDrawsPerWeek } from "./drawsPerWeek";
import { SpeedSelector } from "./speedSelector";
import { StartAndPauseButton } from "./startAndPauseButton";
import { WeekSelector } from "./weeksSelector";

export const SimulationSettings = () => {
  return (
    <div>
      <MyNumbers />

      <div className="pt-7">
        <WeekSelector />
      </div>

      <div className="pt-7">
        <NumberOfDrawsPerWeek />
      </div>

      <div className="pt-7">
        <SpeedSelector />
      </div>

      <div className="pt-7">
        <StartAndPauseButton />
      </div>
    </div>
  );
};
