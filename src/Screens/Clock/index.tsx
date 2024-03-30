import useClock from "@/hooks/useClock";

const Clock = () => {
  const time = useClock();
  return <p className="lg:text-9xl number">{time}</p>;
};

export default Clock;
