import { colour1 } from './data/cssVars'
import { store } from './data/store'
import { initUserId } from './data/userId'
import { addEventListeners } from './listeners'
import { renderOverlay } from './overlay'
import { drawMap } from './renderers/drawMap'
import { resize } from './utils/resize'
import { sleep } from './utils/sleep'
import { fitToScreen, zoomIntoCircle } from './utils/zoom'

export async function setup() {
  resize()
  addEventListeners()
  initUserId()
  renderOverlay()
  drawMap(store.currentMap)
  await sleep(1)
  document.body.style.backgroundColor = colour1.value
}

export async function introSequence() {
  zoomIntoCircle({ transition: 0 })
  await sleep(100)
  fitToScreen(store.currentMap, { transition: 1300, translateDelay: 600 })
  await sleep(1000)
  store.textOpacity = 1
}
