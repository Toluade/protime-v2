import { twMerge } from "tailwind-merge";
import Selector from "./Selector";
import RecentTimerItem from "./RecentTimer";
import TimerListItem from "./RunningTimer";
import { useTimerStore } from "@/store/timerStore";

import { useRunningTimerStore } from "@/store/runningTimers";
import { sortTimers } from "@/utils";

const TimerV2 = () => {
  const runningTimers = useRunningTimerStore((state) => state.runningTimers);
  const addRunningTimer = useRunningTimerStore((state) => state.addTimer);
  const recentTimers = useTimerStore((state) => state.recentTimers);

  const runTimer = (time: number) => {
    const duration = new Date().getTime() + time;
    addRunningTimer({
      id: Date.now(),
      time: duration,
      duration: time,
      newDurarion: time,
      paused: false,
    });
  };

  return (
    <div
      className={twMerge(
        "pt-20 min-h-[100svh] no-scrollbar",
        runningTimers?.length < 1 &&
          recentTimers?.length < 1 &&
          "flex justify-center items-center"
      )}
    >
      <Selector runTimer={runTimer} />
      <div className={twMerge("mx-auto pt-10 max-w-full sm:max-w-[500px]")}>
        {/* Timers */}
        {runningTimers?.length > 0 && (
          <div className="mt-10 px-2 animate-fade-in duration-300">
            <h2 className="font-bold text-lg neutral-gradient">Timers</h2>
            {runningTimers?.map((time) => (
              <TimerListItem
                key={time?.id}
                milliseconds={time}
                index={time?.id}
                // worker={workers[time?.id?.toString()]}
              />
            ))}
          </div>
        )}
        {/* Recent Timers */}
        {recentTimers?.length > 0 && (
          <div className="mt-10 px-2 animate-fade-in duration-300">
            <h3 className="text-md font-semibold neutral-gradient">Recents</h3>
            {sortTimers(recentTimers, "desc")?.map((time, idx) => (
              <RecentTimerItem
                key={idx}
                milliseconds={time}
                onClick={() => runTimer(time?.time)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimerV2;
