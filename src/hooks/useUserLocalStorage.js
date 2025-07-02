import { useState, useEffect } from "react";

export function useUserLocalStorage(key, user, initialValue = []) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (user && user.email) {
      const stored = localStorage.getItem(`${key}_${user.email}`);
      setValue(stored ? JSON.parse(stored) : initialValue);
    }
  }, [user, key]);

  useEffect(() => {
    if (user && user.email) {
      localStorage.setItem(`${key}_${user.email}`, JSON.stringify(value));
    }
  }, [value, user, key]);

  useEffect(() => {
    if (!user) setValue(initialValue);
  }, [user, initialValue]);

  return [value, setValue];
}