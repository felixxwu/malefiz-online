import { evCache, mouseDownData, svgTranslation, svgZoom } from '../../../signals/signals'
import { getDistance } from '../../../utils/getDistance'

export function handlePointerDown(event: PointerEvent) {
  evCache.value.push(event)
  if (evCache.value.length === 1) {
    mouseDownData.value = {
      coords: { x: event.clientX, y: event.clientY },
      svgTranslation: { ...svgTranslation.value },
      svgZoom: 1,
      pinchDistance: 0,
    }
  } else {
    mouseDownData.value = {
      coords: mouseDownData.value!.coords,
      svgTranslation: mouseDownData.value!.svgTranslation,
      svgZoom: svgZoom.value,
      pinchDistance: getDistance(evCache.value[0], evCache.value[1]),
    }
  }
}
