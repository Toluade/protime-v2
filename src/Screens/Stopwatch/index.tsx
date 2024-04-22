import StopwatchTime from "@/components/StopwatchTime";
import useStopwatch from "@/hooks/useStopwatch";
import useWindowInactivity from "@/hooks/useWindowInactivity";
import { twMerge } from "tailwind-merge";

const Stopwatch = () => {
  const inactive = useWindowInactivity();
  const { timeObj, started, stopwatch, resetTimer, toggleTimer, setStopwatch } =
    useStopwatch();

  return (
    <div
      id="stopwatch-container"
      className="flex flex-col justify-center items-center gap-10 h-svh w-svw select-none"
    >
      <StopwatchTime
        milliseconds={timeObj.hu}
        minutes={timeObj.m}
        seconds={timeObj.s}
        timerStarted={started}
        setCountDown={setStopwatch}
        containerClass={"number"}
      />

      <div
        className={twMerge(
          "flex w-full justify-around scale-50 fixed bottom-4  tall:scale-100 duration-300 ease-in-out",
          inactive ? "translate-y-36" : "translate-y-0"
        )}
      >
        <button
          disabled={stopwatch === 0}
          onClick={resetTimer}
          className="text-sm md:text-lg font-semibold h-16 w-16 md:h-24 md:w-24 flex justify-center items-center rounded-full neutral-btn"
        >
          Reset
        </button>
        <button
          onClick={toggleTimer}
          //   disabled={countdown < 1}
          className={twMerge(
            "text-sm md:text-lg font-semibold h-16 w-16 md:h-24 md:w-24 flex justify-center items-center rounded-full",
            !started ? "start-btn" : started && "stop-btn"
          )}
        >
          {started ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
