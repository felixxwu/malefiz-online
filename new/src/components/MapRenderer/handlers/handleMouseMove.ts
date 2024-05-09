import { circleHovered } from '../../../signals/signals'
import { getCircleFromMousePos } from './utils/getCircleFromMousePos'

export function handleMouseMove(event: MouseEvent) {
  circleHovered.value = getCircleFromMousePos(event)
}
