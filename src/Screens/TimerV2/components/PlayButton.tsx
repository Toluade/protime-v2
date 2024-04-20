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
      <PlayIcon className="fill-green-400 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer" />
    </button>
  );
};

export default PlayButton;
