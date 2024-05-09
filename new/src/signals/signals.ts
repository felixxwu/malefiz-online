import { computed, signal } from '@preact/signals'
import { homePageMap } from '../maps/home'
import { storedSignal } from '../utils/storedSignal'
import { GameState } from '../types/gameTypes'
import { HashTable, mapToHashTable } from '../utils/mapToHashTable'
import { Circle } from '../types/mapTypes'
import { onGameStateChange } from './onGameStateChange'

export const screenWidth = signal(window.innerWidth)
export const screenHeight = signal(window.innerHeight)

export const menuOpen = signal(false)
export const waitingForServer = signal(false)

export const map = signal(homePageMap)
export const svgZoom = signal(1)
export const svgTranslation = signal({ x: 0, y: 0 })
export const svgTransition = signal(0)
export const textOpacity = signal(0)

export const gameState = signal<GameState | null>(null)
gameState.subscribe(onGameStateChange)

export const gameStateHashTable = computed<HashTable>(() => {
  return gameState.value ? mapToHashTable(gameState.value) : {}
})
export const gameOver = signal<string | null>(null)
export const lastDieRoll = signal<number | null>(null)
export const userId = storedSignal('userId', new Date().getTime().toString())

export const pieceSelected = signal<string | null>(null)
export const circleHovered = signal<Circle | null>(null)

export const evCache = signal<PointerEvent[]>([])
export const mouseDownData = signal<{
  coords: { x: number; y: number }
  svgTranslation: { x: number; y: number }
  svgZoom: number
  pinchDistance: number
} | null>(null)

export const test = signal(0)
test.subscribe(() => {
  console.log(`test.value`, test.value)
})
