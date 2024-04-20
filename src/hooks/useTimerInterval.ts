import worker_script from "@/utils/worker-script3";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

const timerWorker = new Worker(worker_script);

const useInterval = (
  timerId: string,
  timerStarted: boolean,
  setCountDown: Dispatch<SetStateAction<number>>
) => {
  const timerIdRef = useRef<string>(timerId);
  console.log({ timerId });

  useEffect(() => {
    timerWorker.onmessage = ({ data: { id, time } }) => {
      if (id === timerIdRef.current) {
        setCountDown((count) => (count > 0 ? count - time : count));
      }
    };
  }, []);

  useEffect(() => {
    timerIdRef.current = timerId;
  }, [timerId]);

  useEffect(() => {
    if (timerStarted) {
      timerWorker.postMessage({ id: timerIdRef.current, turn: "on" });
    } else {
      timerWorker.postMessage({ id: timerIdRef.current, turn: "off" });
    }
  }, [timerStarted]);
};

export default useInterval;
