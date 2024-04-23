import PauseIcon from "@/icons/PauseIcon";
import PlayIcon from "@/icons/PlayIcon";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  milliseconds?: number;
  countDown?: number;
  timerStarted: boolean;
  stopped: boolean;
  toggleTimer: () => void;
};

const Progress = ({
  milliseconds,
  countDown,
  timerStarted,
  toggleTimer,
}: Props) => {
  const progress = useMemo(() => {
    const p = Math.floor((Number(countDown) / Number(milliseconds)) * 100);

    return 100 - p;
  }, [countDown, milliseconds]);

  return (
    <div className="relative size-16">
      <svg
        className="size-full"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-neutral-200 dark:text-neutral-800"
          strokeWidth="2"
        ></circle>
        {/* <!-- Progress Circle inside a group with rotation --> */}
        <g className="origin-center -rotate-90 transform">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={twMerge(
              "stroke-current duration-75 text-amber-500 dark:text-yellow-700"
            )}
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={progress?.toString()}
          ></circle>
        </g>
      </svg>
      {/* <!-- Percentage Text --> */}
      <div
        onClick={toggleTimer}
        className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2"
      >
        {timerStarted ? (
          <PauseIcon className="fill-amber-500 dark:fill-yellow-700 w-7 h-7 sm:w-9 sm:h-9 cursor-pointer" />
        ) : (
          <PlayIcon className="fill-amber-500 dark:fill-yellow-700 w-7 h-7 sm:w-9 sm:h-9 cursor-pointer" />
        )}
      </div>
    </div>
  );
};

export default Progress;
