import { listOfNumbers } from "./util";

const TimeSelector = () => {
  const hours = listOfNumbers(23);
  const mins = listOfNumbers(59);
  return (
    <div className="grid grid-flow-col gap-[2ch] relative box-border">
      <span title="Hour">
        {hours?.map((hr, idx) => <time key={idx}>{hr}</time>)}
      </span>
      <span title="Minute">
        {mins?.map((min, idx) => <time key={idx}>{min}</time>)}
      </span>
      <span title="Second">
        {mins?.map((sec, idx) => <time key={idx}>{sec}</time>)}
      </span>
    </div>
  );
};

export default TimeSelector;
