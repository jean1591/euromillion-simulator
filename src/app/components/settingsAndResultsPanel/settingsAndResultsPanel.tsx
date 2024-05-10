"use client";

import { Divider } from "../divider";
import { FinancialResults } from "./financialResults";
import { SimuationSettings } from "./simulationSettings";

export const SettingsAndResultsPanel = () => {
  return (
    <div>
      <div className="border border-dark-shade/25 bg-light-shade py-10 px-5 rounded-md">
        <SimuationSettings />
        <Divider />
        <FinancialResults />
      </div>
    </div>
  );
};
