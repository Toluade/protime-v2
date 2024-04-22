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
import Time from "../../components/Time";
import { twMerge } from "tailwind-merge";
import alarm from "@/assets/audio/alarm.mp3";
import alarm2 from "@/assets/audio/alarm.ogg";
import useFullScreen from "@toluade/use-fullscreen";
import useWindowInactivity from "@/hooks/useWindowInactivity";

function Selector() {
  const inactive = useWindowInactivity();
  const [time, setTime] = useState({
    h: 0,
    m: 0,
    s: 0,
  });
  const [milliseconds, setMilliseconds] = useState(0);

  const { isFullScreen, exitFullscreen } = useFullScreen("root");

  const {
    timeObj,
    countdown,
    setCountdown,
    started,
    stopped,
    timeUp,
    startTimer,
    toggleTimer,
    stopTimer,
  } = useTimer(milliseconds);

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
    setCountdown(total);
  };

  useEffect(() => {
    updateMilliseconds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  useEffect(() => {
    if (isFullScreen && stopped) {
      exitFullscreen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen, stopped]);

  return (
    <div
      id="timer-container"
      className={twMerge(
        "flex flex-col justify-center items-center gap-10 h-svh w-svw select-none"
      )}
    >
      {timeUp && (
        <audio autoPlay muted={false} loop>
          <source src={alarm} type="audio/mpeg" />
          <source src={alarm2} type="audio/ogg" />
        </audio>
      )}
      <ReactIf
        condition={stopped}
        component={
          <div className="flex items-center justify-center gap-5 overflow-hidden xs:gap-2 text-[12vw]  xl:text-[15vw] [&>*]:neutral-gradient">
            <div className="flex items-center gap-1">
              <NumericSelector
                value={time.h?.toString()}
                onValueChange={(v) => handleChange(v, "h")}
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
        }
        fallback={
          <Time
            hours={timeObj.h}
            minutes={timeObj.m}
            seconds={timeObj.s}
            timerStarted={started}
            setCountDown={setCountdown}
            containerClass={"number"}
          />
          // <TimerListItem
          //   hours={timeObj.h}
          //   minutes={timeObj.m}
          //   seconds={timeObj.s}
          //   timerStarted={started}
          //   setCountDown={setCountdown}
          //   containerClass={"number"}
          //   countDown={countdown}
          //   milliseconds={milliseconds}
          //   stopped={stopped}
          //   timeUp={timeUp}
          //   toggleTimer={toggleTimer}
          //   startTimer={startTimer}
          // />
        }
      />

      <div
        className={twMerge(
          "flex w-full justify-around scale-50 fixed bottom-4  tall:scale-100 duration-300 ease-in-out",
          inactive ? "translate-y-36" : "translate-y-0"
        )}
      >
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
