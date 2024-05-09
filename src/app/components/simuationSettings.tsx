import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { DrawsPerSecondButton } from "./drawsPerSecondButton";
import { SimuationSettings as ISimuationSettings } from "../page";
import { MyNumbers } from "./myNumbers";

interface Props {
  settings: ISimuationSettings;
  setSettings: Dispatch<SetStateAction<ISimuationSettings>>;
}

export const SimuationSettings = ({ settings, setSettings }: Props) => {
  console.log("🚀 ~ SimuationSettings");
  const [drawsPerSecond, setDrawsPerSecond] = useState(1);

  useEffect(() => {
    console.log(`Settings updated: drawsPerSecond ${drawsPerSecond}...`);
    setSettings({ ...settings, drawsPerSecond });
  }, [drawsPerSecond]);

  return (
    <div>
      <div className="pb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Tirages par seconde</p>
        <DrawsPerSecondButton setDrawsPerSecond={setDrawsPerSecond} />
      </div>

      <div className="pb-6 flex items-center justify-between">
        <p className="text-lg font-semibold">Vos numéros</p>
        <MyNumbers settings={settings} setSettings={setSettings} />
      </div>

      <div className="pb-6 flex items-center justify-between">
        <button
          type="button"
          className="relative inline-flex items-center justify-center rounded-md w-full px-3 py-2 text-sm font-semibold border border-dark-shade/25 text-dark-shade hover:bg-dark-shade/10"
          onClick={() =>
            setSettings({ ...settings, isRunning: !settings.isRunning })
          }
        >
          {settings.isRunning ? (
            <p>Mettre en pause (ne fonctionne pas)</p>
          ) : (
            <p>Lancer la simulation</p>
          )}
        </button>
      </div>
    </div>
  );
};
