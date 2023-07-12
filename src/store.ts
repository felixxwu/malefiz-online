import { drawMap } from './createMap'
import { GameState } from './game'
import { svg, translateGroup, zoomGroup } from './getSVG'
import { menuMap } from './menu'
import { updatePlayers } from './players'

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
  gameId: <string | null>null,
  currentMap: menuMap,
  textOpacity: 0,
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
    translateGroup!.style.transition = `all ${value}ms`
    zoomGroup!.style.transition = `all ${value}ms`
  },
  gameState(value) {
    if (!value) return
    updatePlayers(value)
  },
  currentMap(value) {
    value && drawMap(value)
  },
  textOpacity(value) {
    document.documentElement.style.setProperty('--textOpacity', `${value}`)
  },
}

export const store: typeof init = new Proxy(init, {
  get<T>(target: T, key: keyof T) {
    return target[key]
  },
  set<T extends typeof store>(target: T, key: keyof T, value: T[keyof T]) {
    target[key] = value
    onChange[key]?.(value)
    return true
  },
})

type Type<T extends keyof typeof init> = {
  [key in T]?: (value: (typeof init)[key]) => void
}
