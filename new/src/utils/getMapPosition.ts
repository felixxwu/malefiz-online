import { Map } from '../types/mapTypes'

export function getMapPosition(map: Map) {
  const filtered = map.filter(node => !node.custom)

  const mapTop = filtered.reduce((acc, node) => Math.min(acc, node.position.y), Infinity)
  const mapLeft = filtered.reduce((acc, node) => Math.min(acc, node.position.x), Infinity)
  const mapRight = filtered.reduce((acc, node) => Math.max(acc, node.position.x), 0)
  const mapBottom = filtered.reduce((acc, node) => Math.max(acc, node.position.y), 0)
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
