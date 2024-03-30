import NumericSelector from "@/components/NumericSelect";
import { listOfNumbers } from "./util";
import { useEffect, useState } from "react";
import {
  hourToMillisecond,
  minuteToMillisecond,
  secondsToMilliseconds,
} from "@/utils";
import useTimer from "@/hooks/useTimer";
import ReactIf from "@/components/ReactIf";
import Timer from "../Timer";
import { twMerge } from "tailwind-merge";

function Selector() {
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });
  const [milliseconds, setMilliseconds] = useState(0);

  const {
    timeObj,
    countdown,
    setCountdown,
    started,
    stopped,
    // timeUp,
    startTimer,
    toggleTimer,
    stopTimer,
    // resetTimer,
  } = useTimer(milliseconds);

  const handleChange = (value: number, key: keyof typeof time) => {
    setTime((val) => ({
      ...val,
      [key]: value,
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
    setCountdown(total);
  };

  useEffect(() => {
    updateMilliseconds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  // console.log({ milliseconds, countdown });
  return (
    <div className="flex flex-col justify-center items-center gap-10 h-svh">
      <ReactIf
        condition={stopped}
        component={
          <div className="flex items-center justify-center gap-5 overflow-hidden xs:gap-2 text-[8vw] sm:text-[10vw] md:text-[10vw] lg:text-[12vw] xl:text-[15vw]">
            <div className="flex items-center gap-1">
              <NumericSelector
                value={time.h}
                onValueChange={(v) => handleChange(Number(v), "h")}
                triggerClass="number"
                options={hours}
                placeholder="0"
              />
              <span className="text-[4vw]">
                {time.h === 1 ? "hour" : "hours"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <NumericSelector
                value={time.m}
                onValueChange={(v) => handleChange(Number(v), "m")}
                triggerClass="number"
                options={mins}
                placeholder="00"
              />
              <span className="text-[4vw]">min</span>
            </div>
            <div className="flex items-center gap-1">
              <NumericSelector
                value={time.s}
                onValueChange={(v) => handleChange(Number(v), "s")}
                triggerClass="number"
                options={mins}
                placeholder="00"
              />
              <span className="text-[4vw]">sec</span>
            </div>
          </div>
        }
        fallback={
          <Timer
            hours={timeObj.h}
            minutes={timeObj.m}
            seconds={timeObj.s}
            timerStarted={started}
            setCountDown={setCountdown}
            containerClass={"number"}
          />
        }
      />

      <div className="flex w-full justify-around scale-75 fixed bottom-3">
        <button
          disabled={stopped}
          onClick={stopTimer}
          className="text-sm md:text-lg font-semibold h-16 w-16 md:h-24 md:w-24 flex justify-center items-center rounded-full neutral-btn"
        >
          Cancel
        </button>
        <button
          onClick={stopped ? startTimer : toggleTimer}
          disabled={countdown < 1}
          className={twMerge(
            "text-sm md:text-lg font-semibold h-16 w-16 md:h-24 md:w-24 flex justify-center items-center rounded-full",
            stopped || !started ? "start-btn" : started && "pause-btn"
          )}
        >
          {stopped
            ? "Start"
            : started
              ? "Pause"
              : !started && !stopped
                ? "Resume"
                : "Start"}
        </button>
      </div>
    </div>
  );
}

export default Selector;
