import { useEffect, useState } from "react";

import { Draw } from "../draw";
import { useSimulationStore } from "@/lib/store";

export const MyNumbers = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const myNumbers = useSimulationStore((state) => state.myNumbers);

  return (
    <>
      {isClient ? (
        <div className="-mt-5">
          <Draw myNumbers={[0]} draw={myNumbers} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
