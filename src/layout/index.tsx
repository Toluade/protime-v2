import SelectComp from "@/components/SelectComp";
import useNavigation from "@/hooks/useNavigation";
import ROUTES from "@/routes";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import packageFile from "package.json";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { goto } = useNavigation();
  const options = ROUTES?.filter((item) => item.title !== "Home")?.map(
    (item) => ({
      label: item.title,
      value: item.path,
    })
  );

  const handleChange = (value: string) => {
    goto(value);
  };
  return (
    <div className={twMerge("h-svh w-svw flex justify-center items-center")}>
      <SelectComp
        triggerClass="absolute top-3 left-2"
        placeholder="Timer"
        options={options}
        onValueChange={handleChange}
      />
      {props.children}
      <p className="absolute bottom-3 right-2 text-neutral-600 text-sm">
        v{packageFile.version}
      </p>
    </div>
  );
};

export default Layout;
