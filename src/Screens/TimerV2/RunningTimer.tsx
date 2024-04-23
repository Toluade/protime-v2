/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassNameValue, twMerge } from "tailwind-merge";
import Time from "./components/Time";
import Progress from "./components/Progress";
import Subtext from "./components/Subtext";
import { useEffect, useState } from "react";
import FullscreenTime from "./components/FullscreenTime";
import DialogDemo from "@/components/DialogComp";
import { RunningTime, useRunningTimerStore } from "@/store/runningTimers";
import alarm from "@/assets/audio/alarm.mp3";
import alarm2 from "@/assets/audio/alarm.ogg";
import useCountDownTimer from "@/hooks/useCountdown";

type Props = {
  index: number;
  milliseconds: RunningTime;
  containerClass?: ClassNameValue;
  // worker: Worker;
};

const RunningTimer = ({ milliseconds, containerClass }: Props) => {
  const updateTimer = useRunningTimerStore((state) => state.updateTimer);
  const removeTimer = useRunningTimerStore((state) => state.removeTimer);
  const duration = milliseconds?.paused
    ? milliseconds?.newDurarion
    : milliseconds?.time - new Date().getTime();
  const [newTime, setNewTime] = useState(new Date().getTime() + duration);
  const [firstLoad, setFirstLoad] = useState(true);
  const {
    timeObj,
    countDown,
    started,
    stopped,
    timeUp,
    startTimer,
    toggleTimer,
    // stopTimer,
  } = useCountDownTimer(newTime, milliseconds?.paused);

  useEffect(() => {
    if (!milliseconds?.paused) {
      startTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeUp) {
      setTimeout(() => {
        removeTimer(milliseconds);
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeUp]);

  const onPlay = () => {
    setNewTime(new Date().getTime() + countDown);
    updateTimer({
      id: milliseconds?.id,
      time: Date.now() + countDown,
      duration: milliseconds?.duration,
      newDurarion: milliseconds?.newDurarion,
      paused: false,
    });
  };

  const progressControl = () => {
    if (!started) {
      onPlay();
      toggleTimer();
    } else {
      toggleTimer();
    }
  };

  const reset = () => setNewTime(new Date().getTime() + milliseconds?.duration);

  useEffect(() => {
    if (!started && !firstLoad) {
      updateTimer({
        id: milliseconds?.id,
        time: Date.now() + countDown,
        duration: milliseconds?.duration,
        newDurarion: countDown,
        paused: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, firstLoad]);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <>
      {timeUp && (
        <audio autoPlay muted={false} loop>
          <source src={alarm} type="audio/mpeg" />
          <source src={alarm2} type="audio/ogg" />
        </audio>
      )}
      <div
        className={twMerge(
          "flex justify-between items-center gap-1 px-4 pt-2 pb-1 w-full border-y border-y-neutral-200 dark:border-y-neutral-800",
          containerClass
        )}
      >
        <div className="flex flex-col gap-1">
          <DialogDemo
            trigger={
              <Time
                {...{
                  hours: timeObj.h,
                  minutes: timeObj.m,
                  seconds: timeObj.s,
                  containerClass: "[&>*]:neutral-gradient",
                }}
              />
            }
            content={
              <FullscreenTime
                {...{
                  hours: timeObj.h,
                  minutes: timeObj.m,
                  seconds: timeObj.s,
                }}
              />
            }
          />
          <Subtext
            {...{
              milliseconds: milliseconds?.duration,
              onDelete: () => removeTimer(milliseconds),
              onReset: reset,
            }}
          />
        </div>
        <Progress
          {...{
            countDown: countDown,
            milliseconds: milliseconds?.duration,
            timerStarted: started,
            stopped,
            toggleTimer: progressControl,
          }}
        />
      </div>
    </>
  );
};

export default RunningTimer;
