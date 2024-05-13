import { RootState } from "@/lib/store";
import { SimulationStatus } from "./simulationStatus";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const FinancialResults = () => {
  const { numberOfDrawsPerWeek, numberOfWeeksToPlay } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { drawsNumber, winnings } = useSelector(
    (state: RootState) => state.simulationResults
  );

  useEffect(() => {}, [numberOfDrawsPerWeek, numberOfWeeksToPlay]);

  return (
    <div className="text-base">
      <p className="text-center font-medium">
        {`${numberOfDrawsPerWeek} tirages par semaine sur 
        ${isNaN(numberOfWeeksToPlay) ? 52 : numberOfWeeksToPlay} 
        semaines`}
      </p>

      <div className="pt-6">
        <SimulationStatus />
      </div>

      <div className="pt-6">
        <TextDisplay title="Total dépensé" value={`${drawsNumber * 2.5}€`} />
        <TextDisplay title="Gains" value={`${winnings}€`} />
        <TextDisplay
          title="Balance"
          value={`${-drawsNumber * 2.5 + winnings}€`}
        />
      </div>
    </div>
  );
};

const TextDisplay = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="pt-2 flex items-center gap-x-5">
      <p className="font-medium">{title}</p>
      <p className="font-light">{value}</p>
    </div>
  );
};
