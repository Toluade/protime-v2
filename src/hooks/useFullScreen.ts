/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
  }
}

function useFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  function enterFullScreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
      element.mozRequestFullscreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

  const fullScreenMode = () => {
    const container = document.getElementById("container");
    if (container !== null) {
      enterFullScreen(container);
    }
  };

  const toggleFullScreen = (e: any) => {
    e.stopPropagation();
    if (isFullScreen) {
      exitFullscreen();
    } else {
      fullScreenMode();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", (_evt) => {
      if (window.innerHeight == screen.height) {
        setIsFullScreen(true);
      } else {
        setIsFullScreen(false);
      }
    });

    return () => {
      window.removeEventListener("resize", (_evt) => {
        if (window.innerHeight == screen.height) {
          setIsFullScreen(true);
        } else {
          setIsFullScreen(false);
        }
      });
    };
  }, []);

  return {
    toggleFullScreen,
  };
}

export default useFullScreen;
