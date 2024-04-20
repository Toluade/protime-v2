import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RunningTime = {
  id: number;
  time: number;
  duration: number;
  newDurarion: number;
  paused: boolean;
};
type TimerStore = {
  runningTimers: Array<RunningTime>;
  addTimer: (time: RunningTime) => void;
  updateTimer: (time: RunningTime) => void;
  removeTimer: (time: RunningTime) => void;
};

const update = (time: RunningTime, timers: Array<RunningTime>) => {
  const newArray = timers?.map((timer) => {
    if (timer?.id === time?.id) {
      return {
        ...time,
      };
    } else {
      return {
        ...timer,
      };
    }
  });
  return newArray as Array<RunningTime>;
};

const remove = (time: RunningTime, timers: Array<RunningTime>) => {
  const newArray = timers?.filter((item) => item?.id !== time?.id);
  return newArray;
};

export const useRunningTimerStore = create(
  persist<TimerStore>(
    (set, get) => ({
      runningTimers: [],
      addTimer: (time) =>
        set(() => ({
          runningTimers: [...get().runningTimers, time],
        })),
      updateTimer: (time) =>
        set(() => ({
          runningTimers: [...update(time, get().runningTimers)],
        })),
      removeTimer: (time) =>
        set(() => ({
          runningTimers: [...remove(time, get().runningTimers)],
        })),
    }),
    {
      name: "running-timers-store", // name of the item in the storage (must be unique)
    }
  )
);
