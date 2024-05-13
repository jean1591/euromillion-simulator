import { Draw } from "../draw";

interface Props {
  draw: number[];
  myNumbers: number[];
  winnings: number;
}

export const DrawAndWinnings = ({ draw, myNumbers, winnings }: Props) => {
  return (
    <div className="flex items-center justify-center gap-x-5">
      <Draw key={draw.join()} myNumbers={myNumbers} draw={draw} />
      <p className="mt-5 text-base font-light">+{winnings}€</p>
    </div>
  );
};
