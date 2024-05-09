import { svgTransition, svgZoom } from '../signals'

export function zoomIn() {
  svgTransition.value = 300
  svgZoom.value *= 1.2
}

export function zoomOut() {
  svgTransition.value = 300
  svgZoom.value *= 0.8
}
