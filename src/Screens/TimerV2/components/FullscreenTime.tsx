/* eslint-disable @typescript-eslint/no-explicit-any */
import { twMerge } from "tailwind-merge";

type Props = {
  hours: any;
  minutes: any;
  seconds: any;
  //   timerStarted: boolean;
  //   countDown?: number;
  //   setCountDown: Dispatch<SetStateAction<number>>;
  //   containerClass?: ClassNameValue;
};

const FullscreenTime = ({
  hours,
  minutes,
  seconds,
  //   timerStarted,
  //   setCountDown,
  //   containerClass,
}: Props) => {
  return (
    <div
      id="timer-container"
      className={twMerge(
        "flex flex-col justify-center items-center gap-10 h-svh w-svw select-none "
      )}
    >
      <div
        className={twMerge(
          "flex items-center select-none timer-font-size",
          "[&>*]:neutral-gradient number"
        )}
      >
        <p id="hour">{hours}</p>
        <p className="column timer__item">:</p>
        <p id="min">{minutes}</p>

        <p className="column timer__item">:</p>
        <p id="sec">{seconds}</p>
      </div>
    </div>
  );
};

export default FullscreenTime;
