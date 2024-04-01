import { useEffect, useState } from "react";

const useStopwatch = () => {
  const [stopwatch, setStopwatch] = useState(0);
  const [started, setStarted] = useState(false);
  const [stopped, setStopped] = useState(true);
  const [timeUp, setTimeUp] = useState(false);

  const startTimer = () => {
    setStarted(true);
    setStopped(false);
  };
  const toggleTimer = () => setStarted((prev) => !prev);
  const stopTimer = () => {
    if (stopped) return;
    setStopwatch(0);
    setStarted(false);
    setTimeout(() => {
      setStopped(true);
    }, 0);
  };
  const resetTimer = () => setStopwatch(0);

  useEffect(() => {
    if (stopwatch === 0) {
      setTimeUp(true);
      setTimeout(() => {
        setTimeUp(false);
      }, 4000);
      setStarted(false);
    } else {
      setTimeUp(false);
    }
  }, [stopwatch]);
  //   console.log({ stopwatch });

  return {
    timeObj: zeroFormat(getReturnValues(stopwatch)),
    stopwatch,
    setStopwatch,
    started,
    stopped,
    timeUp,
    startTimer,
    toggleTimer,
    stopTimer,
    resetTimer,
  };
};

const getReturnValues = (stopwatch: number) => {
  // calculate time left
  //   const days = Math.floor(stopwatch / (1000 * 60 * 60 * 24));
  const h = Math.floor((stopwatch % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((stopwatch % (1000 * 60 * 60)) / (1000 * 60));
  //   const m1 = (stopwatch % (1000 * 60 * 60)) / (1000 * 60);
  const s = Math.floor((stopwatch % (1000 * 60)) / 1000);
  const hu = Math.floor((stopwatch % 1000) / 10);
  return { h, m, s, hu };
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

export default useStopwatch;
