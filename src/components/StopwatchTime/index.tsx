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
        "[&>*]:bg-clip-text [&>*]:text-transparent [&>*]:bg-gradient-to-b [&>*]:from-neutral-200 [&>*]:to-neutral-500",
        containerClass
      )}
    >
      {/* <p id="hour">{hours}</p>
      <p className="column timer__item">:</p> */}
      <p id="min">{minutes}</p>

      <p className="column timer__item">:</p>
      <p id="sec">{seconds}</p>

      <p className="text-[50%] -translate-y-[30%] self-end">.</p>
      <p id="sec" className="text-[50%] -translate-y-[30%] self-end">
        {milliseconds}
      </p>
    </div>
  );
};

export default StopwatchTime;
