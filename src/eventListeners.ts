import { CONSTS } from './consts'
import { svg, translateGroup } from './getSVG'
import { resize } from './resize'
import { store } from './store'

function removeEvent(event: PointerEvent) {
  // Remove this event from the target's cache
  const index = evCache.findIndex(cachedEv => cachedEv.pointerId === event.pointerId)
  evCache.splice(index, 1)
}

function getDistance(ev1: PointerEvent, ev2: PointerEvent) {
  return Math.sqrt(Math.pow(ev1.clientX - ev2.clientX, 2) + Math.pow(ev1.clientY - ev2.clientY, 2))
}

const evCache: PointerEvent[] = []

export function addEventListeners() {
  svg!.addEventListener('resize', resize)

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

  svg!.addEventListener('contextmenu', event => event.preventDefault())
}
