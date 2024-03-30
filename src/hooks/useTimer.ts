import { useEffect, useState } from "react";

const useTimer = (input: number) => {
  const [countdown, setCountdown] = useState(0);
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
    setCountdown(input);
    setStarted(false);
    setTimeout(() => {
      setStopped(true);
    }, 0);
  };
  const resetTimer = () => setCountdown(input);

  useEffect(() => {
    if (countdown === 0) {
      setTimeUp(true);
      setStarted(false);
    } else {
      setTimeUp(false);
    }
  }, [countdown]);

  return {
    timeObj: zeroFormat(getReturnValues(countdown)),
    countdown,
    setCountdown,
    started,
    stopped,
    timeUp,
    startTimer,
    toggleTimer,
    stopTimer,
    resetTimer,
  };
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  //   const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const h = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((countDown % (1000 * 60)) / 1000);

  return { h, m, s };
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

export default useTimer;
