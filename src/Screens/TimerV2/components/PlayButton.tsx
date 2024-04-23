import PlayIcon from "@/icons/PlayIcon";

type Props = {
  onClick: () => void;
};

const PlayButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="relative size-16 start-btn rounded-full flex flex-col justify-center items-center"
    >
      <PlayIcon className="fill-green-400 w-7 h-7 sm:w-9 sm:h-9 cursor-pointer" />
    </button>
  );
};

export default PlayButton;
