/* eslint-disable @typescript-eslint/no-explicit-any */
import useIntervalS from "@/hooks/useIntervalS";
import { Dispatch, SetStateAction } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  minutes: any;
  seconds: any;
  milliseconds: any;
  timerStarted: boolean;
  countDown?: number;
  setCountDown: Dispatch<SetStateAction<number>>;
  containerClass?: ClassNameValue;
};

const StopwatchTime = ({
  minutes,
  seconds,
  milliseconds,
  timerStarted,
  setCountDown,
  containerClass,
}: Props) => {
  useIntervalS(timerStarted, setCountDown);
  // console.log(milliseconds);

  return (
    <div
      className={twMerge(
        "flex items-center select-none timer-font-size",
        containerClass
      )}
    >
      {/* <p id="hour">{hours}</p>
      <p className="column timer__item">:</p> */}
      <p id="min">{minutes}</p>

      <p className="column timer__item">:</p>
      <p id="sec">{seconds}</p>

      <p className="column timer__item">.</p>
      <p id="sec">{milliseconds}</p>
    </div>
  );
};

export default StopwatchTime;
