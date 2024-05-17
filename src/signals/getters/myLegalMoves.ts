import { computed } from '@preact/signals'
import { getMyPlayer } from '../queries/getMyPlayer'
import { getLegalMoves } from '../queries/legalMoves'
import { getCircleFromPiece } from '../queries/getCircleFromPiece'

export const myLegalMoves = computed(() => {
  const myPieces = getMyPlayer()!.positions
  const myLegalMoves = myPieces
    .map(position => getLegalMoves(getCircleFromPiece(position.pieceId)!.id))
    .reduce((acc, val) => acc.concat(val), [])
  return myLegalMoves
})
