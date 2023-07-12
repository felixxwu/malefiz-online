import { svg, translateGroup } from '../utils/getSvgGroup'
import { store } from '../data/store'
import { evCache, getDistance, removeEvent } from '.'

export function addPointerEventListeners() {
  svg!.addEventListener('pointerdown', event => {
    evCache.push(event)
    if (evCache.length === 1) {
      store.mouseDownData = {
        coords: { x: event.clientX, y: event.clientY },
        svgTranslation: { ...store.svgTranslation },
        svgZoom: 1,
        pinchDistance: 0,
      }
    } else {
      store.mouseDownData = {
        coords: store.mouseDownData!.coords,
        svgTranslation: store.mouseDownData!.svgTranslation,
        svgZoom: store.svgZoom,
        pinchDistance: getDistance(evCache[0], evCache[1]),
      }
    }
  })
  svg!.addEventListener('pointermove', event => {
    if (!store.mouseDownData) return

    const index = evCache.findIndex(cachedEv => cachedEv.pointerId === event.pointerId)
    evCache[index] = event
    store.svgTransition = 0
    translateGroup!.style.pointerEvents = 'none'

    if (evCache.length === 2) {
      const euclideanDistance = getDistance(evCache[0], evCache[1])
      const zoomDiff = euclideanDistance / store.mouseDownData.pinchDistance
      store.svgZoom = store.mouseDownData.svgZoom * zoomDiff
    } else {
      const xDiff = event.clientX - store.mouseDownData.coords.x
      const yDiff = event.clientY - store.mouseDownData.coords.y
      store.svgTranslation = {
        x: store.mouseDownData.svgTranslation.x + xDiff / store.svgZoom,
        y: store.mouseDownData.svgTranslation.y + yDiff / store.svgZoom,
      }
    }
  })
  svg!.addEventListener('pointerup', onPointerUp)
  svg!.addEventListener('pointerleave', onPointerUp)
  svg!.addEventListener('pointercancel', onPointerUp)
  function onPointerUp(event: PointerEvent) {
    store.mouseDownData = null
    translateGroup!.style.pointerEvents = 'all'
    removeEvent(event)
  }
}
