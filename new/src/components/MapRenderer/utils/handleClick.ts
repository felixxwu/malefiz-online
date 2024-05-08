import { consts } from '../../../config/consts'
import { getMapPosition } from '../../../maps/mapUtils'
import { map } from '../../../signals'
import { handleCircleClick } from './handleCircleClick'

export function handleClick(event: MouseEvent) {
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
      Math.abs(circle.position.y - mapCoords.y) < 0.5
    ) {
      if (circle.onClick) {
        circle.onClick()
        return
      } else {
        handleCircleClick(circle.id)
        return
      }
    }
  }
  // store.pieceSelected = null
}
