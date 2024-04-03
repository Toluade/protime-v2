import SelectComp from "@/components/SelectComp";
import useNavigation from "@/hooks/useNavigation";
import ROUTES from "@/routes";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import packageFile from "package.json";
import { useCurrentPath } from "@/hooks/useCurrentPath";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { goto } = useNavigation();
  const { pathname } = useCurrentPath();
  const currentTitle = ROUTES?.filter((item) => item.path === pathname)[0]
    ?.title;
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
      <div className="h-full w-full dot-bg">
        {/* Radial gradient for the container to give a faded look */}
        {props.children}
      </div>

      <SelectComp
        triggerClass="absolute top-3 left-2 text-[10px] sm:text-sm"
        placeholder={currentTitle}
        options={options}
        onValueChange={handleChange}
      />

      <p className="absolute bottom-3 right-2 text-neutral-600 text-[10px] sm:text-sm">
        v{packageFile.version}
      </p>
    </div>
  );
};

export default Layout;
