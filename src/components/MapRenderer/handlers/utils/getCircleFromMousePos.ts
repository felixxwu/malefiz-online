import { consts } from '../../../../config/consts'
import { map } from '../../../../signals/signals'
import { getMapPosition } from '../../../../utils/getMapPosition'

export function getCircleFromMousePos(event: MouseEvent | PointerEvent) {
  const rect = document.getElementById(consts.mapPositionRef)!.getBoundingClientRect()
  const mapSize = getMapPosition(map.value)
  const circleSize = rect.width / mapSize.mapWidth || rect.height / mapSize.mapHeight
  const mapCoords = circleSize
    ? {
        x: (event.clientX - rect.left) / circleSize + mapSize.mapLeft,
        y: (event.clientY - rect.top) / circleSize + mapSize.mapTop,
      }
    : {
        x: mapSize.mapLeft,
        y: mapSize.mapTop,
      }
  for (const circle of map.value) {
    if (
      Math.abs(circle.position.x - mapCoords.x) < 0.5 &&
      Math.abs(circle.position.y - mapCoords.y) < 0.5 &&
      !circle.custom
    ) {
      return circle
    }
  }
  return null
}
