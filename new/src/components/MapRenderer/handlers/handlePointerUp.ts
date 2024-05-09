import {
  circleHovered,
  evCache,
  mouseDownData,
  pieceDragged,
  pieceSelected,
} from '../../../signals/signals'
import { getLegalMoves } from '../../../utils/legalMoves'
import { submitMove } from '../../../utils/submitMove'

export function handlePointerUp(event: PointerEvent) {
  mouseDownData.value = null
  if (pieceDragged.value) {
    if (circleHovered.value) {
      const legalMoves = getLegalMoves(pieceDragged.value.from.id)
      const selectedLegalMove = legalMoves.find(m => m.to.id === circleHovered.value?.id)
      if (selectedLegalMove) {
        submitMove(selectedLegalMove)
      }
    }
    pieceDragged.value = null
    pieceSelected.value = null
  }
  // translateGroup!.style.pointerEvents = 'all'

  // Remove this event from the target's cache
  const index = evCache.value.findIndex(cachedEv => cachedEv.pointerId === event.pointerId)
  evCache.value.splice(index, 1)
}
