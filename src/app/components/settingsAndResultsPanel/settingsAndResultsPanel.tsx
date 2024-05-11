"use client";

import { Divider } from "../divider";
import { FinancialResults } from "./financialResults";
import { Panel } from "../panel";
import { SimuationSettings } from "./simulationSettings";

export const SettingsAndResultsPanel = () => {
  return (
    <Panel>
      <SimuationSettings />
      <Divider />
      <FinancialResults />
    </Panel>
  );
};
