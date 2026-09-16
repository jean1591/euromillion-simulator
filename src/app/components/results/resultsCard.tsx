import { SimulationStatus } from "../settingsAndResultsPanel/simulationStatus";
import { TICKET_PRICE } from "@/utils/prizeTiers";
import { useSimulationStore } from "@/lib/store";

export const ResultsCard = () => {
  const numberOfDrawsPerWeek = useSimulationStore(
    (state) => state.numberOfDrawsPerWeek
  );
  const numberOfWeeksToPlay = useSimulationStore(
    (state) => state.numberOfWeeksToPlay
  );
  const drawsNumber = useSimulationStore((state) => state.drawsNumber);
  const winnings = useSimulationStore((state) => state.winnings);
  const winningDrawsCount = useSimulationStore(
    (state) => state.winningDrawsCount
  );
  const biggestWin = useSimulationStore((state) => state.biggestWin);

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
            <p className="font-medium">{`${drawsNumber * TICKET_PRICE}€`}</p>
            <p className="uppercase font-normal text-xs">Total dépensé</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${winnings}€`}</p>
            <p className="uppercase font-normal text-xs">Gains</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${-drawsNumber * TICKET_PRICE + winnings}€`}</p>
            <p className="uppercase font-normal text-xs">Résultat</p>
          </div>

          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${biggestWin}€`}</p>
            <p className="uppercase font-normal text-xs">Plus gros gain</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${(drawsNumber
              ? (winnings / (drawsNumber * TICKET_PRICE)) * 100
              : 0
            ).toFixed(2)}%`}</p>
            <p className="uppercase font-normal text-xs">Taux de retour</p>
          </div>
          <div className="bg-light-shade border border-ship-cove-200 rounded-md shadow-sm text-base p-3">
            <p className="font-medium">{`${(
              (winningDrawsCount / (drawsNumber ? drawsNumber : 1)) *
              100
            ).toFixed(2)}%`}</p>
            <p className="uppercase font-normal text-xs">Tirages gagnants</p>
          </div>
        </div>
      </div>
    </div>
  );
};
