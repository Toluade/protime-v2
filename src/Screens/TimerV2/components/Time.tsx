/* eslint-disable @typescript-eslint/no-explicit-any */

import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  hours: any;
  minutes: any;
  seconds: any;
  containerClass?: ClassNameValue;
};
const Time = ({ hours, minutes, seconds, containerClass }: Props) => {
  return (
    <div
      className={twMerge(
        "flex items-center text-6xl [&>*]:neutral-gradient",
        containerClass
      )}
    >
      {hours !== "00" && (
        <>
          <p id="hour">{hours}</p>
          <p className="column timer__item">:</p>
        </>
      )}
      <p id="min">{minutes}</p>

      <p className="column timer__item">:</p>
      <p id="sec">{seconds}</p>
    </div>
  );
};

export default Time;
