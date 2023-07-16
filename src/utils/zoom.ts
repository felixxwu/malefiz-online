import { CONSTS } from '../data/consts'
import { Circle, Map } from '../types/mapTypes'
import { store } from '../data/store'
import { getMapPosition } from '../maps/mapUtils'

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

  const widthZoom = window.innerWidth / (mapWidth * 100 + CONSTS.CIRCLE_RADIUS * 2)
  const heightZoom = window.innerHeight / (mapHeight * 100 + CONSTS.CIRCLE_RADIUS * 2)
  const smallestZoom = Math.min(widthZoom, heightZoom)
  const smallestScreenLength = Math.min(window.innerWidth, window.innerHeight)

  setTimeout(() => {
    store.svgTransition = transition ?? 500
    store.svgTranslation = {
      x: screenCenterX - mapCenterX * 100,
      y: screenCenterY - mapCenterY * 100,
    }
  }, translateDelay)

  setTimeout(() => {
    store.svgTransition = transition ?? 500
    store.svgZoom =
      smallestZoom === Infinity
        ? smallestScreenLength / CONSTS.CIRCLE_RADIUS / 5
        : Math.min(smallestZoom * 0.8, 2)
  }, zoomDelay)
}

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
  const circleToZoomInOn = circle ?? store.currentMap.find(circle => circle.zoomInPoint)!

  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2
  const longestScreenLength = Math.max(window.innerWidth, window.innerHeight)

  setTimeout(() => {
    store.svgTransition = transition ?? 500
    store.svgTranslation = {
      x: screenCenterX - circleToZoomInOn.position.x * 100,
      y: screenCenterY - circleToZoomInOn.position.y * 100,
    }
  }, translateDelay)

  setTimeout(() => {
    store.svgTransition = transition ?? 500
    store.svgZoom = longestScreenLength / CONSTS.CIRCLE_RADIUS
  }, zoomDelay)
}

export function zoomIn() {
  store.svgTransition = 300
  store.svgZoom *= 1.2
}

export function zoomOut() {
  store.svgTransition = 300
  store.svgZoom *= 0.8
}
