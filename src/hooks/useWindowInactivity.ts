import { useEffect, useState } from "react";

const useWindowInactivity = () => {
  const [inactive, setInactive] = useState(false);

  const events = ["mousemove", "touchstart"];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    timeout = setTimeout(() => {
      setInactive(true);
    }, 5000);
    events.forEach((event) =>
      window.addEventListener(event, () => {
        clearTimeout(timeout);
        setInactive(false);
        timeout = setTimeout(() => {
          setInactive(true);
        }, 5000);
      })
    );

    return () =>
      events.forEach((event) =>
        window.removeEventListener(event, () => {
          clearTimeout(timeout);
          setInactive(false);
          timeout = setTimeout(() => {
            setInactive(true);
          }, 5000);
        })
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return inactive;
};

export default useWindowInactivity;
