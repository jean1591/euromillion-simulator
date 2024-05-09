"use client";

import React, { Dispatch, SetStateAction } from "react";

import { SimuationSettings as ISimuationSettings } from "../../page";
import { SimuationSettings } from "./simuationSettings";

interface Props {
  settings: ISimuationSettings;
  setSettings: Dispatch<SetStateAction<ISimuationSettings>>;
}

export const SettingsAndResultsPanel = ({ settings, setSettings }: Props) => {
  return (
    <div>
      <SimuationSettings settings={settings} setSettings={setSettings} />
      {/* Re-rendered each time */}
      <div>12</div>
    </div>
  );
};
