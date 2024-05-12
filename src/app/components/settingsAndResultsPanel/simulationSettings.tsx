import { MyNumbers } from "./myNumbers";
import { NumberOfDrawsPerWeek } from "./drawsPerWeek";
import { NumberOfWeeksToPlay } from "./numberOfWeeksToPlay";
import { StartAndPauseButton } from "./startAndPauseButton";
import { classNames } from "@/utils/classNames";

export const SimuationSettings = () => {
  return (
    <div>
      <SingleSetting title="Vos numéros" paddingTop={false}>
        <MyNumbers />
      </SingleSetting>

      <SingleSetting title="Nombre de semaines à jouer">
        <NumberOfWeeksToPlay />
      </SingleSetting>

      <SingleSetting title="2 tirages par semaines">
        <NumberOfDrawsPerWeek />
      </SingleSetting>

      <div className="pt-7">
        <StartAndPauseButton />
      </div>
    </div>
  );
};

const SingleSetting = ({
  title,
  children,
  paddingTop = true,
}: {
  title: string;
  children: React.ReactNode;
  paddingTop?: boolean;
}) => {
  return (
    <div
      className={classNames(
        paddingTop ? "pt-7" : "",
        "flex items-center justify-between"
      )}
    >
      <p className="text-base font-medium">{title}</p>
      {children}
    </div>
  );
};
