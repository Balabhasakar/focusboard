import { useEffect, useState } from "react";

// Safely read a saved value. Falls back if nothing is saved,
// the JSON is broken, or the saved data fails validation.
function readStorage(key, fallback, validate) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (validate && !validate(parsed)) return fallback;
    return parsed;
  } catch {
    // Storage blocked, or the saved text is not valid JSON
    return fallback;
  }
}

function useLocalStorage(key, initialValue, validate) {
  // The function form runs only once, on first render, so saved data
  // is read before the sample data is ever used.
  const [value, setValue] = useState(() =>
    readStorage(key, initialValue, validate)
  );

  // Save whenever the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage full or blocked: the app keeps working, just without saving
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;