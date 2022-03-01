import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export const localStore = <T>(key: string, initValue: T): Writable<T> => {
  const toString = (value) => JSON.stringify(value, null, 2)
  const toObj = JSON.parse

  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, toString(initValue))
  }

  const saved = toObj(localStorage.getItem(key))

  const { subscribe, set, update } = writable(saved)

  return {
    subscribe,
    set: (value) => {
      localStorage.setItem(key, toString(value))
      return set(value)
    },
    update
  }
}

interface ThemeObject {
  dark: boolean;
  colorblind: boolean;
}

export const theme = localStore<ThemeObject>('theme', {
  dark: false,
  colorblind: false
})