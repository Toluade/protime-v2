import { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CloseIcon from "@/icons/CloseIcon";
import RadialGradient from "../RadialGradient";

type Props = {
  trigger: ReactNode;
  content: ReactNode;
};

const DialogDemo = ({ trigger, content }: Props) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="w-full">{trigger}</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-fade-in fixed top-0 left-0 h-svh w-svw rounded-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none dotted-bg">
        <RadialGradient />
        <div className="absolute top-0 left-0 h-lvh w-lvw animate-fade-in">
          {content}
        </div>
        <Dialog.Close asChild>
          <button
            className="text-black dark:text-white hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <CloseIcon className="" />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
