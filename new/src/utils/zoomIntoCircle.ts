import { consts } from '../config/consts'
import { map, svgTransition, svgTranslation, svgZoom } from '../signals'
import { Circle } from '../types/mapTypes'

export async function zoomIntoCircle({
  circle,
  transition,
  zoomDelay,
  translateDelay,
}: {
  circle?: Circle
  transition?: number
  zoomDelay?: number
  translateDelay?: number
}) {
  const circleToZoomInOn = circle ?? map.value.find(circle => circle.zoomInPoint)!

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2
  const longestScreenLength = Math.max(window.innerWidth, window.innerHeight)

  setTimeout(() => {
    svgTransition.value = transition ?? 500
    svgTranslation.value = {
      x: screenCenterX - circleToZoomInOn.position.x * 100,
      y: screenCenterY - circleToZoomInOn.position.y * 100,
    }
  }, translateDelay)

  setTimeout(() => {
    svgTransition.value = transition ?? 500
    svgZoom.value = longestScreenLength / consts.circleRadius
  }, zoomDelay)
}
