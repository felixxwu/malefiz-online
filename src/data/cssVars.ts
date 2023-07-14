function defineProperty(name: string, initValue: string | null) {
  initValue !== null && document.documentElement.style.setProperty(`--${name}`, initValue)
  return {
    value: `var(--${name})`,
    set(value: string) {
      document.documentElement.style.setProperty(`--${name}`, value)
    },
  }
}

export const textOpacity = defineProperty('textOpacity', '0')
export const menuOpacity = defineProperty('menuOpacity', '0')
export const menuPointerEvents = defineProperty('menuPointerEvents', 'none')
export const colour1 = defineProperty('colour1', null)
