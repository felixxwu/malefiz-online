import {
  circleHovered,
  evCache,
  mouseDownData,
  pieceDragged,
  svgTransition,
  svgTranslation,
  svgZoom,
} from '../../../signals/signals'
import { getDistance } from '../../../utils/getDistance'
import { getCircleFromMousePos } from './utils/getCircleFromMousePos'

export function HandlePointerMove(event: PointerEvent) {
  circleHovered.value = getCircleFromMousePos(event)

  if (!mouseDownData.value) return

  if (pieceDragged.value) return

  const index = evCache.value.findIndex(cachedEv => cachedEv.pointerId === event.pointerId)
  evCache.value[index] = event
  svgTransition.value = 0

  if (evCache.value.length === 2) {
    const euclideanDistance = getDistance(evCache.value[0], evCache.value[1])
    const zoomDiff = euclideanDistance / mouseDownData.value.pinchDistance
    svgZoom.value = mouseDownData.value.svgZoom * zoomDiff
  } else {
    const xDiff = event.clientX - mouseDownData.value.coords.x
    const yDiff = event.clientY - mouseDownData.value.coords.y
    svgTranslation.value = {
      x: mouseDownData.value.svgTranslation.x + xDiff / svgZoom.value,
      y: mouseDownData.value.svgTranslation.y + yDiff / svgZoom.value,
    }
  }
}
