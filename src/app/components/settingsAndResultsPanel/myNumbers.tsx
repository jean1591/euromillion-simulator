import { useEffect, useState } from "react";

import { Draw } from "../draw";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const MyNumbers = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const myNumbers = useSelector(
    (state: RootState) => state.simulationSettings.myNumbers
  );

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
