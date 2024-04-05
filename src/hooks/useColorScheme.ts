import { useEffect, useState } from "react";

const useColorScheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function setDarkTheme() {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    setIsDarkMode(true);

    if (document) {
      document.getElementById("dark-meta")!.setAttribute("content", "#000000");
    } else return;
  }

  function setLightTheme() {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    setIsDarkMode(false);

    if (document) {
      document.getElementById("light-meta")!.setAttribute("content", "#ffffff");
    } else return;
  }

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
