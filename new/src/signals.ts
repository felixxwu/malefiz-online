import { signal } from '@preact/signals'
import { homePageMap } from './maps/home'
import { storedSignal } from './utils/storedSignal'
import { GameState } from './types/gameTypes'

export const screenWidth = signal(window.innerWidth)
export const screenHeight = signal(window.innerHeight)

export const menuOpen = signal(false)
export const action = signal<{ text: string; onClick?: () => void } | null>(null)

export const map = signal(homePageMap)
export const svgZoom = signal(1)
export const svgTranslation = signal({ x: 0, y: 0 })
export const svgTransition = signal(0)
export const textOpacity = signal(0)
export const gameState = signal<GameState | null>(null)

export const userId = storedSignal('userId', new Date().getTime().toString())
