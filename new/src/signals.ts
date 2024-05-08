import { computed, signal } from '@preact/signals'
import { homePageMap } from './maps/home'
import { storedSignal } from './utils/storedSignal'
import { GameState } from './types/gameTypes'
import { HashTable, mapToHashTable } from './utils/mapToHashTable'

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
gameState.subscribe(() => {
  console.log('gameState', gameState.value)
  if (gameState.value && gameState.value!.dieRoll !== null) {
    lastDieRoll.value = gameState.value!.dieRoll
  }
})
export const gameStateHashTable = computed<HashTable>(() => {
  return gameState.value ? mapToHashTable(gameState.value) : {}
})
export const lastDieRoll = signal<number | null>(null)

export const pieceSelected = signal<string | null>(null)

export const userId = storedSignal('userId', new Date().getTime().toString())
