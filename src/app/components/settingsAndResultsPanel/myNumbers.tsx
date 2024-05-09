import { useDispatch, useSelector } from "react-redux";

import { Draw } from "../draw";
import { RootState } from "@/lib/store";
import { generateDraw } from "@/utils/generateDraw";
import { setMyNumbers } from "@/lib/features/simulationSettings/slice";
import { useEffect } from "react";

export const MyNumbers = () => {
  const myNumbers = useSelector(
    (state: RootState) => state.simulationSettings.myNumbers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const myNumbers = generateDraw();

    console.log(`Settings updated: myNumbers ${myNumbers}...`);
    dispatch(setMyNumbers(myNumbers));
  }, []);

  return (
    <div className="-mt-2">
      <Draw myNumbers={[0]} draw={myNumbers} />
    </div>
  );
};
