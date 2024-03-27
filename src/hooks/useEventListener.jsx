import { useEffect } from "react";

export function useEventListener(eventName, action, element = document) {
  useEffect(() => {
    if (!element || !element.addEventListener) {
      throw new Error("element or element.addEventListener is not defined");
    }

    element.addEventListener(eventName, action);

    return () => element.removeEventListener(eventName, action);
  }, [eventName, action, element]);
}
