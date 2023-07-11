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
    const xDiff = event.clientX - store.mouseDownData.coords.x
    const yDiff = event.clientY - store.mouseDownData.coords.y
    store.svgTranslation = {
      x: store.mouseDownData.svgTranslation.x + xDiff / store.svgZoom,
      y: store.mouseDownData.svgTranslation.y + yDiff / store.svgZoom,
    }
  })
  window.addEventListener('pointerup', () => (store.mouseDownData = null))
  window.addEventListener('pointerleave', () => (store.mouseDownData = null))
  window.addEventListener('pointercancel', () => (store.mouseDownData = null))

  window.addEventListener('wheel', event => {
    store.svgZoom = Math.max(0.1, store.svgZoom * (1 + event.deltaY / 2000))
  })

  window.addEventListener('contextmenu', event => event.preventDefault())
}
