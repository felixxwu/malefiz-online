import { CONSTS } from './consts'
import { Circle, Map } from './createMap'
import { store } from './store'

export function fitToScreen(
  map: Map,
  {
    transition,
    zoomDelay,
    translateDelay,
  }: { transition?: number; zoomDelay?: number; translateDelay?: number }
) {
  const mapTop = map.reduce((acc, node) => Math.min(acc, node.position.y), Infinity)
  const mapLeft = map.reduce((acc, node) => Math.min(acc, node.position.x), Infinity)
  const mapRight = map.reduce((acc, node) => Math.max(acc, node.position.x), 0)
  const mapBottom = map.reduce((acc, node) => Math.max(acc, node.position.y), 0)

  const mapWidth = mapRight - mapLeft
  const mapHeight = mapBottom - mapTop
  const mapCenterX = mapLeft + mapWidth / 2
  const mapCenterY = mapTop + mapHeight / 2
  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2

  const widthZoom = window.innerWidth / (mapWidth * 100)
  const heightZoom = window.innerHeight / (mapHeight * 100)
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
        : smallestZoom * 0.6
  }, zoomDelay)
}

export async function zoomIntoCircle(
  circle: Circle,
  {
    transition,
    zoomDelay,
    translateDelay,
  }: { transition?: number; zoomDelay?: number; translateDelay?: number }
) {
  const screenCenterX = window.innerWidth / 2
  const screenCenterY = window.innerHeight / 2
  const longestScreenLength = Math.max(window.innerWidth, window.innerHeight)

  setTimeout(() => {
    store.svgTransition = transition ?? 500
    store.svgTranslation = {
      x: screenCenterX - circle.position.x * 100,
      y: screenCenterY - circle.position.y * 100,
    }
  }, translateDelay)

  setTimeout(() => {
    store.svgTransition = transition ?? 500
    store.svgZoom = longestScreenLength / CONSTS.CIRCLE_RADIUS
  }, zoomDelay)
}
