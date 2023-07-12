import { CONSTS } from '../data/consts'
import { svg } from '../utils/getSvgGroup'
import { store } from '../data/store'

export function addWheelEventListeners() {
  svg!.addEventListener('wheel', event => {
    store.svgTransition = 0
    if (event.ctrlKey) {
      store.svgZoom = Math.min(
        Math.max(CONSTS.MIN_ZOOM, store.svgZoom * (1 + event.deltaY / CONSTS.ZOOM_SLOWDOWN)),
        CONSTS.MAX_ZOOM
      )
    } else {
      store.svgTranslation = {
        x: store.svgTranslation.x - event.deltaX / store.svgZoom / CONSTS.PAN_SLOWDOWN,
        y: store.svgTranslation.y - event.deltaY / store.svgZoom / CONSTS.PAN_SLOWDOWN,
      }
    }
  })
}
