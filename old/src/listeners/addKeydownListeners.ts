import { store } from '../data/store'
import { isMyTurn } from '../game/playerTurns'
import { rollDie } from '../game/rollDie'
import { fitToScreen, zoomIn, zoomOut } from '../utils/zoom'

export function addKeydownListeners() {
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      store.menuOpen = !store.menuOpen
    }
    if (event.key === 'w') {
      store.svgTransition = 200
      store.svgTranslation = {
        x: store.svgTranslation.x,
        y: store.svgTranslation.y + 100 / store.svgZoom,
      }
    }
    if (event.key === 's') {
      store.svgTransition = 200
      store.svgTranslation = {
        x: store.svgTranslation.x,
        y: store.svgTranslation.y - 100 / store.svgZoom,
      }
    }
    if (event.key === 'a') {
      store.svgTransition = 200
      store.svgTranslation = {
        x: store.svgTranslation.x + 100 / store.svgZoom,
        y: store.svgTranslation.y,
      }
    }
    if (event.key === 'd') {
      store.svgTransition = 200
      store.svgTranslation = {
        x: store.svgTranslation.x - 100 / store.svgZoom,
        y: store.svgTranslation.y,
      }
    }
    if (event.key === 'e') {
      zoomIn()
    }
    if (event.key === 'q') {
      zoomOut()
    }
    if (event.key === 'f') {
      fitToScreen(store.currentMap, {})
    }
    if (event.key === 'r' && store.gameState?.dieRoll === null && isMyTurn()) {
      rollDie()
    }
  })
}
