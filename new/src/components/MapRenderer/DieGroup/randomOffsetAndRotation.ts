import { map } from '../../../signals/signals'
import { getMapPosition } from '../../../utils/getMapPosition'

export function randomOffsetAndRotation() {
  const { mapWidth, mapHeight } = getMapPosition(map.value)
  return {
    x: Math.random() * mapWidth * 100,
    y: Math.random() * mapHeight * 100,
    rotation: Math.random() * 100 - 50,
  }
}
