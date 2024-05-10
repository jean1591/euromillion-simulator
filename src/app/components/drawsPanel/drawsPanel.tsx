import { Draws } from "./draws";

export const DrawsPanel = () => {
  return (
    <div>
      <p className="text-2xl font-semibold text-center pb-20">
        Tirages gagnants
      </p>
      <Draws />
    </div>
  );
};
