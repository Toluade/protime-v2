import useClock from "@/hooks/useClock";
import { twMerge } from "tailwind-merge";

const Clock = () => {
  const time = useClock();
  return (
    <div
      id="clock-container"
      className={twMerge(
        "flex flex-col justify-center items-center gap-10 h-svh w-svw select-none clock-font-size"
      )}
    >
      <p className="number neutral-gradient">{time}</p>
    </div>
  );
};

export default Clock;
