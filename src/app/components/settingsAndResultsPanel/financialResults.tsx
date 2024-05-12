import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const FinancialResults = () => {
  const { drawsNumber, winnings } = useSelector(
    (state: RootState) => state.simulationResults
  );

  return (
    <div className="text-base">
      <TextDisplay title="Total dépensé" value={`${drawsNumber * 2.5}€`} />
      <TextDisplay title="Gains" value={`${winnings}€`} />
      <TextDisplay
        title="Balance"
        value={`${-drawsNumber * 2.5 + winnings}€`}
      />
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
