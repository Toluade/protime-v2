import RadialGradient from "@/components/RadialGradient";
import useClock from "@/hooks/useClock";
import useFullScreen from "@toluade/use-fullscreen";
import { twMerge } from "tailwind-merge";

const Clock = () => {
  const { toggleFullScreen } = useFullScreen("clock-container");
  const time = useClock();
  return (
    <div
      id="clock-container"
      onDoubleClick={(e) => toggleFullScreen(e)}
      className={twMerge(
        "flex flex-col justify-center items-center gap-10 h-svh w-svw select-none clock-font-size",
        "dot-bg"
      )}
    >
      <RadialGradient />
      <p className="number neutral-gradient">{time}</p>
    </div>
  );
};

export default Clock;
