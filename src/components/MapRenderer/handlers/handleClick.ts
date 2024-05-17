import { pieceSelected } from '../../../signals/signals'
import { handleCircleClick } from './handleCircleClick'
import { getCircleFromMousePos } from './utils/getCircleFromMousePos'

export function handleClick(event: MouseEvent) {
  const circle = getCircleFromMousePos(event)
  if (!circle) {
    pieceSelected.value = null
    return
  }
  if (circle.onClick) {
    circle.onClick()
  } else {
    handleCircleClick(circle.id)
  }
}
