import React, { ForwardedRef } from "react";
import * as Select from "@radix-ui/react-select";
import { ClassNameValue, twMerge } from "tailwind-merge";
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

type SelectorProps = Select.SelectProps & {
  options: Array<number>;
  placeholder?: string;
  triggerClass?: ClassNameValue;
};

const NumericSelector = (props: SelectorProps) => (
  <Select.Root {...props}>
    <Select.Trigger
      className={twMerge(
        "inline-flex items-center justify-center rounded px-1 py-1 leading-none gap-[5px] shadow-sm hover:bg-mauve3 outline-none",
        props.triggerClass
      )}
      aria-label="Food"
    >
      <Select.Value placeholder={props.placeholder || "Select"} />
      <Select.Icon className="">
        {/* <ChevronDownIcon /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[2vw] h-[2vw]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden rounded-md shadow-md bg-neutral-50 dark:bg-neutral-900">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] cursor-default">
          {/* <ChevronUpIcon /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[2vw] h-[2vw]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group className="">
            {props.options?.map((number, idx) => (
              <SelectItem key={idx} value={number}>
                {number < 10 ? "0" + number : number}
              </SelectItem>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px]  cursor-default">
          {/* <ChevronDownIcon /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[2vw] h-[2vw]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
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
          " leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          {/* <CheckIcon /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[2vw] h-[2vw]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export default NumericSelector;
