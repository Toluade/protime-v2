// import worker_script from "@/utils/worker-script";
import { Dispatch, SetStateAction, useEffect } from "react";

// const worker = new Worker(worker_script);

const useInterval = (
  timerStarted: boolean,
  setCountDown: Dispatch<SetStateAction<number>>,
  timerWorker: Worker
) => {
  useEffect(() => {
    if (timerWorker) {
      timerWorker.onmessage = ({ data: { time } }) => {
        setCountDown((count) => (count > 0 ? count - time : count));
      };
    }
  }, [setCountDown, timerWorker]);

  useEffect(() => {
    if (timerStarted && timerWorker) {
      timerWorker.postMessage({ turn: "on" });
    } else if (timerWorker) {
      timerWorker.postMessage({ turn: "off" });
    }
  }, [timerStarted, timerWorker]);
};

export default useInterval;
