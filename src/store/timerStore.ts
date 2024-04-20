import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RecentTimer = {
  id: number;
  time: number;
};

type TimerStore = {
  recentTimers: Array<RecentTimer>;
  addTimer: (time: RecentTimer) => void;
  removeTimer: (time: RecentTimer) => void;
};

const remove = (time: RecentTimer, timers: Array<RecentTimer>) => {
  const newArray = timers?.filter((item) => item?.id !== time?.id);
  return newArray;
};

export const useTimerStore = create(
  persist<TimerStore>(
    (set, get) => ({
      recentTimers: [],
      addTimer: (time) =>
        set(() => ({
          recentTimers: [...get().recentTimers, time],
        })),
      removeTimer: (time) =>
        set(() => ({
          recentTimers: [...remove(time, get().recentTimers)],
        })),
    }),
    {
      name: "recent-timers-store", // name of the item in the storage (must be unique)
    }
  )
);
