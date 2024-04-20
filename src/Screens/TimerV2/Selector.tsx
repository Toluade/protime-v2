import NumericSelector from "@/components/NumericSelect";
import { useEffect, useState } from "react";
import { listOfNumbers } from "../Timer/util";
import {
  hourToMillisecond,
  minuteToMillisecond,
  secondsToMilliseconds,
} from "@/utils";
import { twMerge } from "tailwind-merge";
import { useTimerStore } from "@/store/timerStore";

const Selector = ({ runTimer }: { runTimer: (time: number) => void }) => {
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });
  const [milliseconds, setMilliseconds] = useState(0);

  const addTimer = useTimerStore((state) => state.addTimer);

  const handleChange = (value: string, key: keyof typeof time) => {
    setTime((val) => ({
      ...val,
      [key]: parseInt(value),
    }));
  };

  const hours = listOfNumbers(23);
  const mins = listOfNumbers(59);

  const updateMilliseconds = () => {
    let total = 0;
    Object.values(time)
      ?.map((itm, idx) => {
        if (idx === 0) return hourToMillisecond(itm || 0);
        if (idx === 1) return minuteToMillisecond(itm || 0);
        if (idx === 2) return secondsToMilliseconds(itm || 0);
      })
      ?.forEach((itm) => (total += itm || 0));

    setMilliseconds(total);
  };

  const disableStart = time?.h === 0 && time?.m === 0 && time?.s === 0;

  useEffect(() => {
    updateMilliseconds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  const startTimer = () => {
    addTimer({
      id: Date.now(),
      time: milliseconds,
    });
    runTimer(milliseconds);
  };

  return (
    <div
      className={twMerge(
        "flex flex-col justify-center items-center gap-10 h-fit w-svw select-none relative duration-300"
      )}
    >
      <div className="flex items-center justify-center gap-5 overflow-hidden xs:gap-2 text-[12vw]  xl:text-[15vw] [&>*]:neutral-gradient">
        <div className="flex items-center gap-1">
          <NumericSelector
            value={time.h?.toString()}
            onValueChange={(v) => handleChange(v, "h")}
            triggerClass="number"
            options={hours}
            placeholder="0"
          />
          <span className="text-[4vw]">{time.h === 1 ? "hour" : "hours"}</span>
        </div>
        <div className="flex items-center gap-1">
          <NumericSelector
            value={time.m?.toString()}
            onValueChange={(v) => handleChange(v, "m")}
            triggerClass="number"
            options={mins}
            placeholder="00"
          />
          <span className="text-[4vw]">min</span>
        </div>
        <div className="flex items-center gap-1">
          <NumericSelector
            value={time.s?.toString()}
            onValueChange={(v) => handleChange(v, "s")}
            triggerClass="number"
            options={mins}
            placeholder="00"
          />
          <span className="text-[4vw]">sec</span>
        </div>
      </div>

      <div
        className={twMerge(
          "flex w-full justify-around scale-50  tall:scale-100 duration-300 ease-in-out"
        )}
      >
        <button
          disabled={true}
          className="text-sm md:text-lg font-semibold h-16 w-16 md:h-24 md:w-24 flex justify-center items-center rounded-full neutral-btn"
        >
          Cancel
        </button>
        <button
          onClick={startTimer}
          disabled={disableStart}
          className={twMerge(
            "text-sm md:text-lg font-semibold h-16 w-16 md:h-24 md:w-24 flex justify-center items-center rounded-full start-btn"
          )}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Selector;
