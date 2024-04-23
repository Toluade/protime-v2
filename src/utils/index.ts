import { RunningTime } from "@/store/runningTimers";
import { RecentTimer } from "@/store/timerStore";

export const hourToMillisecond = (value: number) => value * 60 * 60 * 1000;
export const minuteToMillisecond = (value: number) => value * 60 * 1000;
export const secondsToMilliseconds = (value: number) => value * 1000;

export const sortTimers = (
  timers: RunningTime[] | RecentTimer[],
  dir: "asc" | "desc"
) => {
  let newArray;
  if (dir === "asc") {
    newArray = timers?.sort((a, b) => {
      if (a.id > b.id) return 1;
      else if (a.id < b.id) return -1;
      else return 0;
    });
  } else if (dir === "desc") {
    newArray = timers?.sort((a, b) => {
      if (a.id < b.id) return 1;
      else if (a.id > b.id) return -1;
      else return 0;
    });
  }

  return newArray as RunningTime[];
};
