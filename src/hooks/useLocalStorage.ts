import { useState, useEffect } from "react";

export default (key: string, initialValue: string = "") => {
  const [value, setValue] = useState<string>(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect((): void => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
