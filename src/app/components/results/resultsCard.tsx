import { RootState } from "@/lib/store";
import { SimulationStatus } from "../settingsAndResultsPanel/simulationStatus";
import { useSelector } from "react-redux";

export const ResultsCard = () => {
  const { numberOfDrawsPerWeek, numberOfWeeksToPlay } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { drawsNumber, winnings } = useSelector(
    (state: RootState) => state.simulationResults
  );

  return (
    <div className="border border-dark-accent/25 rounded-md bg-dark-accent/5 shadow-lg mb-10">
      <div className="border border-b-dark-accent/25 text-dark-accent p-5 rounded-t-md text-center">
        <p className="text-lg font-normal uppercase">Résultats</p>
        <p className="text-sm font-normal text-center">
          {`pour ${numberOfDrawsPerWeek} ${
            numberOfDrawsPerWeek === 1 ? "tirage" : "tirages"
          } par semaine sur 
        ${isNaN(numberOfWeeksToPlay) ? 52 : numberOfWeeksToPlay} 
        semaines`}
        </p>
      </div>

      <div className="pt-6 px-5">
        <SimulationStatus />
      </div>

      <div className="p-5 grid grid-cols-3 gap-x-5">
        <div className="bg-light-shade border border-dark-shade/25 rounded-md shadow-sm text-base p-3">
          <p className="font-medium">{`${drawsNumber * 2.5}€`}</p>
          <p className="uppercase font-normal text-sm">Total dépensé</p>
        </div>
        <div className="bg-light-shade border border-dark-shade/25 rounded-md shadow-sm text-base p-3">
          <p className="font-medium">{`${winnings}€`}</p>
          <p className="uppercase font-normal text-sm">Gains</p>
        </div>
        <div className="bg-light-shade border border-dark-shade/25 rounded-md shadow-sm text-base p-3">
          <p className="font-medium">{`${-drawsNumber * 2.5 + winnings}€`}</p>
          <p className="uppercase font-normal text-sm">Balance</p>
        </div>
      </div>
    </div>
  );
};
