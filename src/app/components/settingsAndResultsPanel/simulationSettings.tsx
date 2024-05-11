import { MyNumbers } from "./myNumbers";
import { NumberOfDrawsPerWeek } from "./drawsPerWeek";
import { NumberOfWeeksToPlay } from "./numberOfWeeksToPlay";
import { StartAndPauseButton } from "./startAndPauseButton";

export const SimuationSettings = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Vos numéros</p>
        <MyNumbers />
      </div>

      <div>
        <div className="pt-7 flex items-center justify-between">
          <p className="text-lg font-semibold">Semaines</p>
          <NumberOfWeeksToPlay />
        </div>
        <p className="pt-1 text-xs font-light">
          (Nombres de semaines pendants lesquelles vous souhaitez jouer)
        </p>
      </div>

      <div className="pt-7 flex items-center justify-between">
        <p className="text-lg font-semibold">2 tirages par semaines</p>
        <NumberOfDrawsPerWeek />
      </div>

      <div className="pt-7">
        <StartAndPauseButton />
      </div>
    </div>
  );
};
