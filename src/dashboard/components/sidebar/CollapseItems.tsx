import { Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: string[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  return (
    <div className="flex h-full cursor-pointer items-center gap-4">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<Icon icon={"fluent:chevron-down-12-regular"} />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item, index) => (
              <span
                key={index}
                className="text-default-500 hover:text-default-900 flex w-full transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
