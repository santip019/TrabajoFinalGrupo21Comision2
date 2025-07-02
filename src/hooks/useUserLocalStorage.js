import { useState, useEffect } from "react";

export function useUserLocalStorage(key, user, initialValue = []) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (user && user.email) {
      const stored = localStorage.getItem(`${key}_${user.email}`);
      const parsed = stored ? JSON.parse(stored) : initialValue;
      setValue(prev => JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev);
    } else {
      setValue(prev => JSON.stringify(prev) !== JSON.stringify(initialValue) ? initialValue : prev);
    }
  }, [user, key]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`${key}_${user.email}`, JSON.stringify(value));
    }
  }, [value, user, key]);

  return [value, setValue];
}