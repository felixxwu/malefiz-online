import { Map } from '../types/mapTypes'

export function getMapPosition(map: Map) {
  const mapTop = map.reduce((acc, node) => Math.min(acc, node.position.y), Infinity)
  const mapLeft = map.reduce((acc, node) => Math.min(acc, node.position.x), Infinity)
  const mapRight = map.reduce((acc, node) => Math.max(acc, node.position.x), 0)
  const mapBottom = map.reduce((acc, node) => Math.max(acc, node.position.y), 0)
  const mapWidth = mapRight - mapLeft
  const mapHeight = mapBottom - mapTop
  const mapCenterX = mapLeft + mapWidth / 2
  const mapCenterY = mapTop + mapHeight / 2

  return {
    mapTop,
    mapLeft,
    mapRight,
    mapBottom,
    mapWidth,
    mapHeight,
    mapCenterX,
    mapCenterY,
  }
}
