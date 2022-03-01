import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export const wStorage = <T>(key: string, initValue: T): Writable<T> => {
  const store = writable(initValue);
  if (typeof Storage === 'undefined') return store;

  const storedValueStr = localStorage.getItem(key);
  if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

  store.subscribe((val) => {
      localStorage.setItem(key, JSON.stringify(val));
  })
  return store;
}

interface ThemeObject {
  dark: boolean;
  colorblind: boolean;
}

export const theme = wStorage<ThemeObject>('theme', JSON.parse(localStorage.getItem("theme")) || {
  dark: false,
  colorblind: false
});

theme.subscribe((value) => localStorage.theme = JSON.stringify(value));