import useClock from "@/hooks/useClock";
import useFullScreen from "@toluade/use-fullscreen";

const Clock = () => {
  const { toggleFullScreen } = useFullScreen("clock-container");
  const time = useClock();
  return (
    <div
      id="clock-container"
      onDoubleClick={(e) => toggleFullScreen(e)}
      className="flex flex-col justify-center items-center gap-10 h-svh w-svw select-none clock-font-size"
    >
      <p className="number bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
        {time}
      </p>
    </div>
  );
};

export default Clock;
