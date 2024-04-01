import React, { ForwardedRef } from "react";
import * as Select from "@radix-ui/react-select";
import { ClassNameValue, twMerge } from "tailwind-merge";

type SelectorProps = Select.SelectProps & {
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  triggerClass?: ClassNameValue;
  value?: string | number;
};

const SelectComp = (props: SelectorProps) => (
  <Select.Root {...props}>
    <Select.Trigger
      className={twMerge(
        "inline-flex items-center justify-center rounded px-3 py-1 text-sm leading-none gap-[5px] outline-none",
        props.triggerClass
      )}
      aria-label="Food"
    >
      <Select.Value placeholder={props.placeholder || "Select"} />
      <Select.Icon className="text-violet11">
        {/* <ChevronDownIcon /> */}
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden rounded-md bg-white dark:bg-black">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          {/* <ChevronUpIcon /> */}
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          {props.options?.map((option, idx) => (
            <SelectItem className="text-md" key={idx} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          {/* <ChevronDownIcon /> */}
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

interface Props extends Select.SelectItemProps {
  children: React.ReactNode;
  //   className: ClassNameValue;
}

const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: Props,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={twMerge(
          "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          {/* <CheckIcon /> */}
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default SelectComp;
