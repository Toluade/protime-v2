import SelectComp from "@/components/SelectComp";
import useNavigation from "@/hooks/useNavigation";
import ROUTES from "@/routes";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import packageFile from "package.json";
import { useCurrentPath } from "@/hooks/useCurrentPath";
import RadialGradient from "@/components/RadialGradient";
import SunIcon from "@/icons/SunIcon";
import useColorScheme from "@/hooks/useColorScheme";
import MoonIcon from "@/icons/MoonIcon";
import ArrowPointingIn from "@/icons/ArrowsPointingIn";
import ArrowPointingOut from "@/icons/ArrowsPointingOut";
import useFullScreen from "@toluade/use-fullscreen";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  const { goto } = useNavigation();
  const { pathname } = useCurrentPath();
  const scheme = useColorScheme();
  const screen = useFullScreen("root");
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
      <RadialGradient />

      <SelectComp
        triggerClass={twMerge(
          "absolute top-3 left-3 neutral-gradient text-[10px] sm:text-sm",
          screen.isFullScreen && "hidden"
        )}
        placeholder={currentTitle}
        options={options}
        onValueChange={handleChange}
      />

      <div className="flex items-center justify-end absolute top-3 right-3 gap-1 sm:gap-3">
        <button
          title={
            scheme.isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          onClick={
            scheme?.isDarkMode ? scheme.setLightTheme : scheme.setDarkTheme
          }
          className="flex justify-center items-center text-neutral-400 dark:text-neutral-400 rounded-full text-[10px] sm:text-sm py-1"
        >
          {scheme.isDarkMode ? <SunIcon /> : <MoonIcon />}
        </button>
        <button
          title={screen.isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
          onClick={() => screen.toggleFullScreen()}
          className="flex justify-center items-center text-neutral-400 dark:text-neutral-400 rounded-full text-[10px] sm:text-sm py-1"
        >
          {screen.isFullScreen ? <ArrowPointingIn /> : <ArrowPointingOut />}
        </button>
      </div>

      <p className="absolute bottom-3 right-3 neutral-gradient text-[10px] sm:text-sm">
        v{packageFile.version}
      </p>
    </div>
  );
};

export default Layout;
