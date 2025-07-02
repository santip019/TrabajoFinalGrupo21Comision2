import { useState, useEffect } from "react";

export function useUserLocalStorage(key, user, initialValue = []) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (user && user.email) {
      const stored = localStorage.getItem(`${key}_${user.email}`);
      setValue(stored ? JSON.parse(stored) : initialValue);
    } else {
      // Solo setea si el valor es distinto
      setValue((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(initialValue)) {
          return initialValue;
        }
        return prev;
      });
    }
  }, [user, key, initialValue]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`${key}_${user.email}`, JSON.stringify(value));
    }
  }, [value, user, key]);

  return [value, setValue];
}