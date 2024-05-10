import { DrawsPerSecondButton } from "./drawsPerSecondButton";
import { MyNumbers } from "./myNumbers";

export const SimuationSettings = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Tirages par seconde</p>
        <DrawsPerSecondButton />
      </div>

      <div className="pt-7 flex items-center justify-between">
        <p className="text-lg font-semibold">Vos numéros</p>
        <MyNumbers />
      </div>

      <div>
        <div className="pt-7 flex items-center justify-between">
          <p className="text-lg font-semibold">Semaines</p>
          <input
            type="text"
            className="block w-1/3 rounded-md py-1.5 px-2 text-dark-shade  placeholder:text-dark-shade/50 border border-dark-shade/20"
            placeholder="52"
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
        <p className="pt-1 text-xs font-light">
          (Nombres de semaines pendants lesquelles vous souhaitez jouer)
        </p>
      </div>
    </div>
  );
};
