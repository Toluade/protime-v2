import useClock from "@/hooks/useClock";
import useFullScreen from "@/hooks/useFullScreen";

const Clock = () => {
  const { toggleFullScreen } = useFullScreen("clock-container");
  const time = useClock();
  return (
    <div
      id="clock-container"
      onDoubleClick={(e) => toggleFullScreen(e)}
      className="flex flex-col justify-center items-center gap-10 h-svh w-svw bg-white dark:bg-black select-none clock-font-size"
    >
      <p className="number">{time}</p>
    </div>
  );
};

export default Clock;
