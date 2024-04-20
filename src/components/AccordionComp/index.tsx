import * as Accordion from "@radix-ui/react-accordion";
import { ReactNode } from "react";

type Props = {
  trigger: ReactNode;
  content: ReactNode;
};

const AccordionComp = ({ trigger, content }: Props) => {
  return (
    <Accordion.Root type="single">
      <Accordion.Item value="">
        <Accordion.Header>
          <Accordion.Trigger>{trigger}</Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>{content}</Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default AccordionComp;
