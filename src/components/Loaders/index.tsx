import { ClipLoader } from "react-spinners";

type Props = {
  color?: string;
  size?: number;
};
const FullPageSpinner = ({ color }: Props) => {
  return (
    <div className="flex justify-center items-center absolute top-0 h-svh w-svw">
      <ClipLoader size={40} color={color ?? "red"} />
    </div>
  );
};

const Spinner = ({ color, size }: Props) => {
  return (
    <div className="inline-flex justify-center w-full">
      <ClipLoader size={size ?? 25} color={color ?? "white"} />
    </div>
  );
};

export { FullPageSpinner, Spinner };
