import { RootState } from "@/lib/store";
import { SimulationStatus } from "../settingsAndResultsPanel/simulationStatus";
import { useSelector } from "react-redux";

export const ResultsCard = () => {
  const { numberOfDrawsPerWeek, numberOfWeeksToPlay } = useSelector(
    (state: RootState) => state.simulationSettings
  );
  const { drawsNumber, winnings, winningsArray } = useSelector(
    (state: RootState) => state.simulationResults
  );

  return (
    <div className="rounded-md bg-ship-cove-500 shadow-lg mb-10">
      <div className="p-5 text-center">
        <p className="text-light-shade font-medium text-md text-center">
          {`Jouer ${numberOfDrawsPerWeek} tirage(s) par semaine sur ${numberOfWeeksToPlay} semaines`}
        </p>
      </div>

      <div className="p-5">
        <SimulationStatus />

        <div className="pt-5 grid grid-cols-3 gap-3">
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${drawsNumber * 2.5}€`}</p>
            <p className="uppercase font-normal text-xs">Total dépensé</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${winnings}€`}</p>
            <p className="uppercase font-normal text-xs">Gains</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${-drawsNumber * 2.5 + winnings}€`}</p>
            <p className="uppercase font-normal text-xs">Résultat</p>
          </div>

          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${
              winningsArray.length ? Math.max(...winningsArray) : 0
            }€`}</p>
            <p className="uppercase font-normal text-xs">Plus gros gain</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${(winningsArray.length
              ? (winnings / (drawsNumber * 2.5)) * 100
              : 0
            ).toFixed(2)}%`}</p>
            <p className="uppercase font-normal text-xs">Gains</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${(
              (winningsArray.length / (drawsNumber ? drawsNumber : 1)) *
              100
            ).toFixed(2)}%`}</p>
            <p className="uppercase font-normal text-xs">Tirages gagnants</p>
          </div>
        </div>
      </div>
    </div>
  );
};
