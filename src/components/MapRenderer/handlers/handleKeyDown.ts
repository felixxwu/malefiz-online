import {
  map,
  menuOpen,
  menuPage,
  svgTransition,
  svgTranslation,
  svgZoom,
} from '../../../signals/signals'
import { fitToScreen } from '../../../signals/actions/fitToScreen'
import { zoomIn, zoomOut } from '../../../signals/actions/zoom'
import { rollDie } from '../../../dbactions/rollDie'
import { dieNotRolled, myTurn } from '../../../signals/getters'

export function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    const wasOpen = menuOpen.value
    menuOpen.value = !menuOpen.value
    // Reset menu page to main when closing the menu
    if (wasOpen && !menuOpen.value) {
      menuPage.value = 'main'
    }
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
  if (event.key === 'r') {
    if (myTurn.value && dieNotRolled.value) {
      rollDie()
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
}
