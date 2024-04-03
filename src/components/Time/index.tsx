/* eslint-disable @typescript-eslint/no-explicit-any */
import useInterval from "@/hooks/useInterval";
import { Dispatch, SetStateAction } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  hours: any;
  minutes: any;
  seconds: any;
  timerStarted: boolean;
  countDown?: number;
  setCountDown: Dispatch<SetStateAction<number>>;
  containerClass?: ClassNameValue;
};

const Time = ({
  hours,
  minutes,
  seconds,
  timerStarted,
  setCountDown,
  containerClass,
}: Props) => {
  useInterval(timerStarted, setCountDown);

  return (
    <div
      className={twMerge(
        "flex items-center select-none timer-font-size",
        "[&>*]:neutral-gradient",
        containerClass
      )}
    >
      <p id="hour">{hours}</p>
      <p className="column timer__item">:</p>
      <p id="min">{minutes}</p>

      <p className="column timer__item">:</p>
      <p id="sec">{seconds}</p>
    </div>
  );
};

export default Time;
