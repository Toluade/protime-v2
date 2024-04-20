import { useState, useEffect } from "react";

const useCountDownTimer = (target: number, paused: boolean) => {
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(true);
  const [timeUp, setTimeUp] = useState(false);

  const startTimer = () => {
    setStarted(true);
    setStopped(false);
  };
  const toggleTimer = () => setStarted((prev) => !prev);

  const countDownDate = new Date(target).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (started && !paused) {
      interval = setInterval(() => {
        setCountDown(
          countDownDate - new Date().getTime() <= 0
            ? 0
            : countDownDate - new Date().getTime()
        );
      }, 1000);

      if (countDown < 0) {
        setCountDown(0);
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [countDown, countDownDate, started, paused]);

  useEffect(() => {
    if (countDown === 0) {
      setStarted(false);
      setTimeUp(true);
      setTimeout(() => {
        setTimeUp(false);
      }, 4000);
    } else {
      setTimeUp(false);
    }
  }, [countDown]);

  return {
    timeObj: zeroFormat(getReturnValues(countDown)),
    started,
    stopped,
    timeUp,
    startTimer,
    toggleTimer,
    countDown,
  };
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const d = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const h = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((countDown % (1000 * 60)) / 1000);

  return { d, h, m, s };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const zeroFormat = (obj: any) => {
  const objVal = { ...obj };

  Object.keys(objVal).forEach(function (key) {
    objVal[key] = addZero(objVal[key]);
  });

  return objVal;
};

const addZero = (val: number) => {
  return val < 10 ? "0" + val : val;
};

export default useCountDownTimer;
