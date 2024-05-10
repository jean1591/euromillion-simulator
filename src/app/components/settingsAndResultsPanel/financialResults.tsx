import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const FinancialResults = () => {
  const { drawsNumber, winnings } = useSelector(
    (state: RootState) => state.simulationResults
  );

  return (
    <div className="text-lg">
      <div className="pb-2 flex items-center gap-x-5">
        <p className="font-medium">Total dépensé</p>
        <p className="font-normal">
          {drawsNumber * 2.5}€ ({drawsNumber} tirages)
        </p>
      </div>

      <div className="pb-2 flex items-center gap-x-5">
        <p className="font-medium">Gains</p>
        <p className="font-normal">{winnings}€</p>
      </div>

      <div className="pb-2 flex items-center gap-x-5">
        <p className="font-medium">Balance</p>
        <p className="font-normal">{-drawsNumber * 2.5 + winnings}€</p>
      </div>
    </div>
  );
};
