import { useEffect, useState } from "react";

const useColorScheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const setDarkTheme = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    setIsDarkMode(true);

    if (document) {
      const themeMeta = <HTMLMetaElement>(
        document.querySelector('meta[name="theme-color"]')
      );

      themeMeta.setAttribute("content", "#000000");
    }
  };

  const setLightTheme = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    setIsDarkMode(false);

    if (document) {
      const themeMeta = <HTMLMetaElement>(
        document.querySelector('meta[name="theme-color"]')
      );

      themeMeta.setAttribute("content", "#ffffff");
    }
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  return { isDarkMode, setDarkTheme, setLightTheme };
};

export default useColorScheme;
