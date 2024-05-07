import { signal } from '@preact/signals'

export function storedSignal<T>(key: string, defaultValue: T) {
  const storedValue =
    localStorage.getItem(key) && (JSON.parse(localStorage.getItem(key) as string) as T)
  const signalValue = signal(storedValue || defaultValue)
  signalValue.subscribe(() => localStorage.setItem(key, JSON.stringify(signalValue.value)))
  return signalValue
}
