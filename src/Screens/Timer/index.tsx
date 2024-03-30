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

const Timer = ({
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
        "flex items-center select-none xs:text-[5vw] sm:text-[15vw] md:text-[19vw] lg:text-[21vw] xl:text-[24vw]",
        containerClass
      )}
    >
      <span id="hour" className="timer__item">
        {hours}
      </span>
      <span className="column timer__item">:</span>
      <span id="min" className="timer__item">
        {minutes}
      </span>

      <span className="column timer__item">:</span>
      <span id="sec" className="timer__item">
        {seconds}
      </span>
    </div>
  );
};

export default Timer;
