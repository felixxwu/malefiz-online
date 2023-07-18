import { colour1 } from './data/cssVars'
import { store } from './data/store'
import { initUserId } from './data/userId'
import { addEventListeners } from './listeners'
import { drawOverlay } from './overlay'
import { drawMap } from './renderers/drawMap'
import { resize } from './utils/resize'
import { sleep } from './utils/sleep'
import { fitToScreen, zoomIntoCircle } from './utils/zoom'

export async function setup() {
  resize()
  addEventListeners()
  initUserId()
  drawOverlay()
  drawMap(store.currentMap)
  document.getElementById('loading')!.remove()
}

export async function introSequence() {
  zoomIntoCircle({ transition: 0 })
  await sleep(100)
  document.body.style.backgroundColor = colour1.value
  fitToScreen(store.currentMap, { transition: 1300, translateDelay: 600 })
  await sleep(1000)
  store.textOpacity = 1
}
