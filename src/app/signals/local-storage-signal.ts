import { signal, WritableSignal } from '@angular/core';

/**
 * Signal utility to create a writable signal that persists its value in localStorage.
 * @param key
 * @param initialValue
 * @returns
 */
export function localStorageSignal<T>(key: string, initialValue: T): WritableSignal<T> {
  const storedValueRaw = localStorage.getItem(key);

  if (storedValueRaw) {
    try {
      initialValue = JSON.parse(storedValueRaw);
    } catch (e) {
      console.error(`Error parsing localStorage value for key "${key}":`, e);
    }
  }

  const writableSignal = signal(initialValue);

  // monkey patch signal setter to also store to localStorage on set
  const setter = writableSignal.set;
  writableSignal.set = (value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
    setter(value);
  };

  return writableSignal;
}

