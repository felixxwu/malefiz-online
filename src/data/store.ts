import { drawMap } from '../renderers/drawMap'
import { menuButtonEnabled, menuOpacity, menuPointerEvents, textOpacity } from './cssVars'
import { GameState } from '../types/gameTypes'
import { svg, translateGroup, zoomGroup } from '../utils/getSvgGroup'
import { homePageMap } from '../maps/home'
import { drawPlayers } from '../renderers/drawPlayers'
import { drawHud } from '../renderers/drawHud'
import { Circle } from '../types/mapTypes'
import { mapToHashTable } from '../maps/mapToHashTable'
import { playAiIfApplicable } from '../localgame/playAiIfApplicable'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { getLegalMoves } from '../game/legalMoves'
import { fitToScreen } from '../utils/zoom'

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
  oldGameState: <GameState | null>null,
  gameStateMapHashed: <{ [key: string]: Circle }>{},
  gameId: <string | null>null,
  currentMap: homePageMap,
  textOpacity: 0,
  menuOpen: false,
  userId: <string | null>null,
  onlinePlayers: <string[]>[],
  pieceSelected: <string | null>null,
  localGame: false,
}

const onChange: Type<keyof typeof init> = {
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
    if (!value) return
    drawPlayers(value)
    drawHud()
    store.gameStateMapHashed = mapToHashTable(value.map)
    playAiIfApplicable()
  },
  gameId(value) {
    menuButtonEnabled.set(value ? 'flex' : 'none')
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
  pieceSelected(value) {
    drawHud()

    if (value) {
      const circle = getCircleFromPiece(store.pieceSelected!)!
      const legalMoves = getLegalMoves(circle.id)
      fitToScreen(legalMoves.concat(circle), {})
    } else {
      fitToScreen(store.currentMap, {})
    }
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

type Type<T extends keyof typeof init> = {
  [key in T]?: (value: (typeof init)[key]) => void
}
