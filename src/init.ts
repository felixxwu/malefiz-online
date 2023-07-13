import { colour1 } from './data/cssVars'
import { store } from './data/store'
import { initUserId } from './data/userId'
import { addEventListeners } from './listeners'
import { renderOverlay } from './overlay'
import { drawMap } from './renderers/drawMap'
import { resize } from './utils/resize'
import { fitToScreen, zoomIntoCircle } from './utils/zoom'

export function setup() {
  resize()
  addEventListeners()
  initUserId()
  renderOverlay()
  drawMap(store.currentMap)
  zoomIntoCircle(store.currentMap[0], { transition: 0 })

  setTimeout(() => {
    document.body.style.backgroundColor = colour1.value
  }, 1)
}

export function introSequence() {
  setTimeout(() => {
    fitToScreen(store.currentMap, { transition: 1000, translateDelay: 800 })
    store.textOpacity = 1
  }, 100)
}
