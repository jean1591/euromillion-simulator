import { Draws } from "./draws";
import { Panel } from "../panel";

export const DrawsPanel = () => {
  return (
    <Panel>
      <p className="text-2xl font-semibold text-center pb-5">
        Tirages gagnants
      </p>
      <div className="flex justify-center">
        <div>
          <Draws />
        </div>
      </div>
    </Panel>
  );
};
