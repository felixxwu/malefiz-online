import { consts } from '../../../config/consts'
import { svgTransition, svgTranslation, svgZoom } from '../../../signals'

export function handleWheel(event: WheelEvent) {
  event.preventDefault()
  svgTransition.value = 0
  if (event.ctrlKey) {
    svgZoom.value = Math.min(
      Math.max(consts.minZoom, svgZoom.value * (1 + event.deltaY / consts.zoomSlowdown)),
      consts.maxZoom
    )
  } else {
    svgTranslation.value = {
      x: svgTranslation.value.x - event.deltaX / svgZoom.value / consts.panSlowdown,
      y: svgTranslation.value.y - event.deltaY / svgZoom.value / consts.panSlowdown,
    }
  }
}
