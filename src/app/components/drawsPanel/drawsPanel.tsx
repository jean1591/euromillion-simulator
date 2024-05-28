import { Draws } from "./draws";
import { Panel } from "../panel";

export const DrawsPanel = () => {
  return (
    <Panel height="h-3/5">
      <p className="text-base font-medium text-left">Tirages gagnants</p>
      <div className="flex justify-center">
        <div>
          <Draws />
        </div>
      </div>
    </Panel>
  );
};
