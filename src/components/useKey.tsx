import { useEffect } from "react";

// custom hook
export function useKey(key: string, action: () => void) {
  useEffect(
    function () {
      const callBack = function (e: any) {
        if (e.code === key) action();
      };
      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [key, action]
  );
}
