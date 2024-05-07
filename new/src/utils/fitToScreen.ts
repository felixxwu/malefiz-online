import { consts } from '../config/consts'
import { getMapPosition } from '../maps/mapUtils'
import { svgTransition, svgTranslation, svgZoom } from '../signals'
import { Map } from '../types/mapTypes'

export function fitToScreen(
  map: Map,
  {
    transition,
    zoomDelay,
    translateDelay,
  }: { transition?: number; zoomDelay?: number; translateDelay?: number }
) {
  const { mapWidth, mapHeight, mapCenterX, mapCenterY } = getMapPosition(map)

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2

  const widthZoom = (window.innerWidth - 10) / (mapWidth * 100 + consts.circleRadius * 2)
  const heightZoom = (window.innerHeight - 200) / (mapHeight * 100 + consts.circleRadius * 2)
  const smallestZoom = Math.min(widthZoom, heightZoom)
  const smallestScreenLength = Math.min(window.innerWidth, window.innerHeight)

  setTimeout(() => {
    svgTransition.value = transition ?? 500
    svgTranslation.value = {
      x: screenCenterX - mapCenterX * 100,
      y: screenCenterY - mapCenterY * 100,
    }
  }, translateDelay)

  setTimeout(() => {
    svgTransition.value = transition ?? 500
    svgZoom.value =
      smallestZoom === Infinity
        ? smallestScreenLength / consts.circleRadius / 5
        : Math.min(smallestZoom, 2)
  }, zoomDelay)
}
