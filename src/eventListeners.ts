import { CONSTS } from './consts'
import { translateGroup } from './getSVG'
import { resize } from './resize'
import { store } from './store'

export function addEventListeners() {
  window.addEventListener('resize', resize)

  window.addEventListener('pointerdown', event => {
    store.mouseDownData = {
      coords: { x: event.clientX, y: event.clientY },
      svgTranslation: { ...store.svgTranslation },
    }
  })
  window.addEventListener('pointermove', event => {
    if (!store.mouseDownData) return
    translateGroup!.style.pointerEvents = 'none'
    const xDiff = event.clientX - store.mouseDownData.coords.x
    const yDiff = event.clientY - store.mouseDownData.coords.y
    store.svgTranslation = {
      x: store.mouseDownData.svgTranslation.x + xDiff / store.svgZoom,
      y: store.mouseDownData.svgTranslation.y + yDiff / store.svgZoom,
    }
  })
  window.addEventListener('pointerup', onPointerUp)
  window.addEventListener('pointerleave', onPointerUp)
  window.addEventListener('pointercancel', onPointerUp)
  function onPointerUp() {
    store.mouseDownData = null
    translateGroup!.style.pointerEvents = 'all'
  }

  window.addEventListener('wheel', event => {
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

  window.addEventListener('contextmenu', event => event.preventDefault())
}
