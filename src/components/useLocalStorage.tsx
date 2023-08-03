import React, { useState } from "react";

export default function useLocalStorage(key: string, initialValue: string[]) {
  const [value, setValue] = useState(function () {
    const storage = localStorage.getItem(key);
    if (storage) return JSON.parse(storage);
    else return initialValue;
  });

  return [value, setValue];
}
