import { signal } from '@preact/signals'
import { homePageMap } from './maps/home'

export const screenWidth = signal(window.innerWidth)
export const screenHeight = signal(window.innerHeight)
export const map = signal(homePageMap)
export const svgZoom = signal(1)
export const svgTranslation = signal({ x: 0, y: 0 })
export const svgTransition = signal(0)
export const textOpacity = signal(0)
