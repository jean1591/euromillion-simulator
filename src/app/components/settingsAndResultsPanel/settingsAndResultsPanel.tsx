import { Panel } from "../panel";
import { SimuationSettings } from "./simulationSettings";

export const SettingsAndResultsPanel = () => {
  return (
    <Panel height="h-80">
      <SimuationSettings />
    </Panel>
  );
};
