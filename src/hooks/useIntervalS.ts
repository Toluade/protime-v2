import worker_script from "@/utils/worker-script2";
import { Dispatch, SetStateAction, useEffect } from "react";

const timerWorker = new Worker(worker_script);

const useIntervalS = (
  timerStarted: boolean,
  setStopTime: Dispatch<SetStateAction<number>>
) => {
  useEffect(() => {
    timerWorker.onmessage = ({ data: { time } }) => {
      setStopTime((count) => (count < 5940000 ? count + time : count));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timerStarted) {
      timerWorker.postMessage({ turn: "on" });
    } else {
      timerWorker.postMessage({ turn: "off" });
    }
  }, [timerStarted]);
};

export default useIntervalS;
