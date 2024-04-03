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
      <div className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
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
