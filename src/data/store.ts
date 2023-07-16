import { drawMap } from '../renderers/drawMap'
import { menuOpacity, menuPointerEvents, textOpacity } from './cssVars'
import { GameState } from '../types/gameTypes'
import { svg, translateGroup, zoomGroup } from '../utils/getSvgGroup'
import { homePageMap } from '../maps/home'
import { drawHud } from '../renderers/drawHud'
import { onGameStateChange } from '../game/onGameStateChange'
import { drawOverlay } from '../overlay'
import { HashTable } from '../maps/mapToHashTable'

const init = {
  mouseDownData: <
    {
      coords: { x: number; y: number }
      svgTranslation: { x: number; y: number }
      svgZoom: number
      pinchDistance: number
    } | null
  >null,
  svgTranslation: { x: 0, y: 0 },
  svgZoom: 1,
  svgTransition: 0,
  gameState: <GameState | null>null,
  oldGameStateHash: <string | null>null,
  gameStateHashTable: <HashTable>{},
  gameId: <string | null>null,
  currentMap: homePageMap,
  textOpacity: 0,
  menuOpen: false,
  userId: <string | null>null,
  onlinePlayers: <string[]>[],
  pieceSelected: <string | null>null,
  localGame: false,
  actionButton: <{ text: string; flashing: boolean; onClick?: () => void } | null>null,
  waitingForServer: false,
}

const onChange: OnChange<keyof typeof init> = {
  mouseDownData(value) {
    if (value) {
      svg!.style.cursor = 'grab'
    } else {
      svg!.style.cursor = 'default'
    }
  },
  svgTranslation(value) {
    translateGroup!.style.transform = `translate(${value.x}px, ${value.y}px)`
  },
  svgZoom(value) {
    zoomGroup!.style.transform = `scale(${value})`
    zoomGroup!.style.transformOrigin = `50% 50%`
  },
  svgTransition(value) {
    translateGroup!.style.transition = `all ${value}ms cubic-bezier(0.65, 0, 0.35, 1) `
    zoomGroup!.style.transition = `all ${value}ms cubic-bezier(0.65, 0, 0.35, 1) `
  },
  gameState(value) {
    if (store.gameState!.gameStateHash !== store.oldGameStateHash) {
      onGameStateChange(value)
      store.oldGameStateHash = store.gameState!.gameStateHash
    }
  },
  currentMap(value) {
    value && drawMap(value)
  },
  textOpacity(value) {
    textOpacity.set(`${value}`)
  },
  menuOpen(value) {
    menuOpacity.set(value ? '1' : '0')
    menuPointerEvents.set(value ? 'all' : 'none')
  },
  onlinePlayers(value) {
    for (const player of store.gameState!.players) {
      for (const position of player.positions) {
        document.getElementById('p' + position.pieceId)!.style.opacity = value.includes(player.id)
          ? '1'
          : '0.3'
      }
    }
  },
  pieceSelected() {
    drawHud()

    // zoom into legal moves
    // if (value) {
    //   const circle = getCircleFromPiece(store.pieceSelected!)!
    //   const legalMoves = getLegalMoves(circle.id)
    //   fitToScreen(legalMoves.concat(circle), {})
    // } else {
    //   fitToScreen(store.currentMap, {})
    // }
  },
  actionButton() {
    drawOverlay()
  },
  waitingForServer() {
    drawHud()
  },
}

export const store: typeof init = new Proxy(init, {
  get<T>(target: T, key: keyof T) {
    return target[key]
  },
  set<T extends typeof store>(target: T, key: keyof T, value: T[keyof T]) {
    // console.log('store', key, '=', value)
    target[key] = value
    onChange[key]?.(value)
    return true
  },
})

type OnChange<T extends keyof typeof init> = {
  [key in T]?: (value: (typeof init)[key]) => void
}
