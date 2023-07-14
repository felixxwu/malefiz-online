import { store } from '../data/store'
import { getPieceFromCircle } from '../utils/getPieceFromCircle'
import { getLegalMoves } from './legalMoves'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { pieceBelongsToMe } from '../utils/pieceBelongsToMe'
import { movePiece } from './movePiece'

export async function handleCircleClick(circleId: string) {
  if (store.gameState!.dieRoll === null) return

  const pieceId = getPieceFromCircle(circleId)
  if (pieceBelongsToMe(pieceId)) {
    // select piece
    store.pieceSelected = pieceId
  } else {
    // make move
    if (pieceBelongsToMe(store.pieceSelected)) {
      const circle = getCircleFromPiece(store.pieceSelected!)
      const legalMoves = getLegalMoves(circle!.id)
      if (legalMoves.map(circle => circle.id).includes(circleId)) {
        await movePiece(store.pieceSelected!, circleId)
      }
    }
    store.pieceSelected = null
  }
}
