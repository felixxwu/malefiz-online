import { consts } from '../../config/consts'
import { getMapPosition } from '../../utils/getMapPosition'
import { svgTransition, svgTranslation, svgZoom } from '../signals'
import { Map } from '../../types/mapTypes'
import { setDiePosition } from '../../components/MapRenderer/DieGroup'

export function fitToScreen(
  map: Map,
  {
    transition,
    zoomDelay,
    translateDelay,
    resetDieTransform = false,
  }: {
    transition?: number
    zoomDelay?: number
    translateDelay?: number
    resetDieTransform?: boolean
  }
) {
  const { mapWidth, mapHeight, mapCenterX, mapCenterY } = getMapPosition(map)

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2

  const widthZoom = (window.innerWidth - 10) / (mapWidth * 100 + consts.circleRadius * 2)
  const heightZoom = (window.innerHeight - 250) / (mapHeight * 100 + consts.circleRadius * 2)
  const smallestZoom = Math.min(widthZoom, heightZoom)
  const smallestScreenLength = Math.min(window.innerWidth, window.innerHeight)

  if (resetDieTransform) {
    const x = (mapCenterX + 0.5) * 100
    const y = (mapCenterY + 0.5) * 100
    setDiePosition(x, y)
  }

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
