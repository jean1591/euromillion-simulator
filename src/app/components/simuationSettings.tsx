import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { DrawResult } from "./drawResult";
import { DrawsPerSecondButton } from "./drawsPerSecondButton";
import { SimuationSettings as ISimuationSettings } from "../page";
import { generateDraw } from "@/utils/generateDraw";

interface Props {
  setSettings: Dispatch<SetStateAction<ISimuationSettings>>;
}

// TODO: why is this rendered at each draw ?
export const SimuationSettings = ({ setSettings }: Props) => {
  console.log("🚀 ~ SimuationSettings");
  const [drawsPerSecond, setDrawsPerSecond] = useState(1);

  const myNumbers = generateDraw();

  useEffect(() => {
    console.log(`Settings updated: drawsPerSecond ${drawsPerSecond}...`);
    setSettings({ myNumbers, drawsPerSecond });
  }, [drawsPerSecond]);

  return (
    <div>
      <div className="pb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Tirages par seconde</p>
        <DrawsPerSecondButton setDrawsPerSecond={setDrawsPerSecond} />
      </div>

      <div className="pb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Vos numéros</p>
        <div className="-mt-2">
          <DrawResult myNumbers={[0]} draw={myNumbers} />
        </div>
      </div>
    </div>
  );
};
