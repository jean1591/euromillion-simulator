import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { DrawResult } from "./drawResult";
import { SimuationSettings } from "../page";
import { generateDraw } from "@/utils/generateDraw";

interface Props {
  settings: SimuationSettings;
  setSettings: Dispatch<SetStateAction<SimuationSettings>>;
}

export const MyNumbers = ({ settings, setSettings }: Props) => {
  useEffect(() => {
    const myNumbers = generateDraw();

    console.log(`Settings updated: myNumbers ${myNumbers}...`);
    setSettings({ ...settings, myNumbers });
  }, []);

  return (
    <div className="-mt-2">
      <DrawResult myNumbers={[0]} draw={settings.myNumbers} />
    </div>
  );
};
