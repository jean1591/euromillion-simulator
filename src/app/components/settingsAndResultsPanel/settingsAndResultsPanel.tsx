"use client";

import React, { useEffect, useState } from "react";

import { RootState } from "@/lib/store";
import { SimuationSettings } from "./simuationSettings";
import { useSelector } from "react-redux";

export const SettingsAndResultsPanel = () => {
  const { winnings } = useSelector(
    (state: RootState) => state.simulationResults
  );

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient ? (
        <div>
          <SimuationSettings />
          {/* Re-rendered each time */}
          <div>{winnings}</div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
