/* eslint-disable @typescript-eslint/no-explicit-any */

import { getReturnValues, zeroFormat } from "@/hooks/useTimer";
import DeleteIcon from "@/icons/DeleteIcon";
import UndoIcon from "@/icons/UndoIcon";
import { ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  milliseconds?: number;
  containerClass?: ClassNameValue;
  onDelete: () => void;
  onReset?: () => void;
};

const Subtext = ({
  milliseconds,
  containerClass,
  onDelete,
  onReset,
}: Props) => {
  const time = zeroFormat(getReturnValues(Number(milliseconds)));
  const trim = (text: string) => {
    if (text === "") return;
    const array = String(text).split("");
    if (array[0] === "0" && array[1] === "0") return null;
    else if (array[0] === "0" && array[1] !== "0") return array[1];
    else return text;
  };
  return (
    <div className="flex justify-start items-center gap-2">
      <p className={twMerge("text-md neutral-gradient", containerClass)}>
        {trim(time?.h) && <span>{trim(time?.h)} hr, </span>}
        {trim(time?.m) && (
          <span>
            {trim(time?.m)} min{trim(time?.s) !== null && ", "}
          </span>
        )}
        {trim(time?.s) && <span>{trim(time?.s)} sec</span>}
      </p>
      <button onClick={onDelete}>
        <DeleteIcon className="stroke-red-600 w-4 h-4 sm:h-4 sm:w-4 cursor-pointer" />
      </button>
      {onReset && (
        <button onClick={() => onReset()}>
          <UndoIcon className="w-4 h-4 sm:h-4 sm:w-4 cursor-pointer" />
        </button>
      )}
    </div>
  );
};

export default Subtext;
