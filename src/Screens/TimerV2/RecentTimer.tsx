/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassNameValue, twMerge } from "tailwind-merge";
import Time from "./components/Time";
import Subtext from "./components/Subtext";
import PlayButton from "./components/PlayButton";
import { getReturnValues, zeroFormat } from "@/hooks/useTimer";
import { useTimerStore } from "@/store/timerStore";
import { RecentTimer as RecentTimerType } from "@/store/timerStore";

type Props = {
  milliseconds: RecentTimerType;
  onClick: () => void;
  containerClass?: ClassNameValue;
};

const RecentTimer = ({ milliseconds, containerClass, onClick }: Props) => {
  const removeTimer = useTimerStore((state) => state.removeTimer);
  const timeObj = zeroFormat(getReturnValues(milliseconds?.time));
  return (
    <div
      className={twMerge(
        "flex justify-between items-center gap-1 px-4 pt-2 pb-1 w-full border-y border-y-neutral-200 dark:border-y-neutral-800",
        containerClass
      )}
    >
      <div className="flex flex-col gap-1">
        <Time
          {...{
            hours: timeObj.h,
            minutes: timeObj.m,
            seconds: timeObj.s,
          }}
          containerClass="opacity-40"
        />
        <Subtext
          {...{
            milliseconds: milliseconds?.time,
            onDelete: () => removeTimer(milliseconds),
          }}
          containerClass="opacity-40"
        />
      </div>
      <PlayButton onClick={() => onClick()} />
    </div>
  );
};

export default RecentTimer;
