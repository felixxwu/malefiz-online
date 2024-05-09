import {
  gameState,
  map,
  menuOpen,
  svgTransition,
  svgTranslation,
  svgZoom,
} from '../../../signals/signals'
import { fitToScreen } from '../../../utils/fitToScreen'
import { isMyTurn } from '../../../utils/playerTurns'
import { rollDie } from '../../../utils/rollDie'
import { zoomIn, zoomOut } from '../../../utils/zoom'

export function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    menuOpen.value = !menuOpen.value
  }
  if (event.key === 'w') {
    svgTransition.value = 200
    svgTranslation.value = {
      x: svgTranslation.value.x,
      y: svgTranslation.value.y + 100 / svgZoom.value,
    }
  }
  if (event.key === 's') {
    svgTransition.value = 200
    svgTranslation.value = {
      x: svgTranslation.value.x,
      y: svgTranslation.value.y - 100 / svgZoom.value,
    }
  }
  if (event.key === 'a') {
    svgTransition.value = 200
    svgTranslation.value = {
      x: svgTranslation.value.x + 100 / svgZoom.value,
      y: svgTranslation.value.y,
    }
  }
  if (event.key === 'd') {
    svgTransition.value = 200
    svgTranslation.value = {
      x: svgTranslation.value.x - 100 / svgZoom.value,
      y: svgTranslation.value.y,
    }
  }
  if (event.key === 'e') {
    zoomIn()
  }
  if (event.key === 'q') {
    zoomOut()
  }
  if (event.key === 'f') {
    fitToScreen(map.value, {})
  }
  if (event.key === 'r' && gameState.value?.dieRoll === null && isMyTurn()) {
    rollDie()
  }
}
