import { signal } from '@preact/signals'
import { homePageMap } from '../maps/home'
import { storedSignal } from '../utils/storedSignal'
import { GameState, PlayerModel } from '../types/gameTypes'
import { Circle } from '../types/mapTypes'
import { eyesList } from '../playermodel/eyes'
import { mouthList } from '../playermodel/mouthes'
import { headList } from '../playermodel/heads'
import { updatePlayerModelMidGame } from '../dbactions/updatePlayerModelMidGame'
import { ItemName } from '../items'
import { EventName } from '../events'

export const debugMode = signal(false)
import { onGameStateChange } from './onGameStateChange'

// TODO: remove export keyword
export const gameState = signal<GameState | null>(null)
gameState.subscribe(onGameStateChange)
export { gameStateHashTable } from './getters/gameStateHashTable'

export type Page = 'main' | 'customise' | 'invite' | 'help'

export const screenWidth = signal(window.innerWidth)
export const screenHeight = signal(window.innerHeight)

export const menuOpen = signal(false)
export const menuPage = signal<Page>('main')
export const pickEmoji = signal(false)
export const waitingForServer = signal(false)
export const arcadeItemSelection = storedSignal<ItemName[]>('arcadeItemSelection', [])
export const arcadeEventSelection = storedSignal<EventName[]>('arcadeEventSelection', [])
export const pickArcadeItems = signal(false)

export const map = signal(homePageMap)
export const svgZoom = signal(1)
export const svgTranslation = signal({ x: -1000, y: 0 })
export const svgTransition = signal(0)
export const textOpacity = signal(0)
export const customCircleHighlights = signal<string[]>([])

export const gameOver = signal<string | null>(null)
export const lastDieRoll = signal<number | null>(null)

export const pieceSelected = signal<string | null>(null)
export const circleHovered = signal<Circle | null>(null)
export const pieceDragged = signal<{ id: string; from: Circle } | null>(null)

export const evCache = signal<PointerEvent[]>([])
export const mouseDownData = signal<{
  coords: { x: number; y: number }
  svgTranslation: { x: number; y: number }
  svgZoom: number
  pinchDistance: number
} | null>(null)

export const userId = storedSignal('userId', new Date().getTime().toString())
export const playerModel = storedSignal<PlayerModel>('playerModel', {
  eyes: Math.floor(Math.random() * eyesList.length),
  mouth: Math.floor(Math.random() * mouthList.length),
  head: Math.floor(Math.random() * headList.length),
})
playerModel.subscribe(updatePlayerModelMidGame)
export const customisationOpened = storedSignal('customisationOpened', false)
export const audioVolume = storedSignal('audioVolume', 75)
export const started = signal(false)
