"use client";

import React, { useEffect, useState } from "react";

import { FinancialResults } from "./financialResults";
import { SimuationSettings } from "./simuationSettings";

export const SettingsAndResultsPanel = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <p className="text-2xl font-semibold text-center pb-20">Paramètres</p>
      {isClient ? (
        <div>
          <SimuationSettings />
          <FinancialResults />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
