import { store } from '../data/store'
import { getPieceFromCircle } from '../utils/getPieceFromCircle'
import { getLegalMoves } from './legalMoves'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { pieceBelongsToMe } from '../utils/pieceBelongsToMe'
import { movePiece } from './movePiece'
import { takeStone } from './takeStone'

export async function handleCircleClick(clickedCircleId: string) {
  if (store.waitingForServer) return
  if (store.gameState!.dieRoll === null) return

  const pieceId = getPieceFromCircle(clickedCircleId)
  if (pieceBelongsToMe(pieceId)) {
    // select piece
    store.pieceSelected = pieceId
  } else {
    // make move
    if (pieceBelongsToMe(store.pieceSelected)) {
      const circle = getCircleFromPiece(store.pieceSelected!)
      const legalMoves = getLegalMoves(circle!.id)
      if (legalMoves.map(circle => circle.id).includes(clickedCircleId)) {
        if (store.gameState!.stones.find(stone => stone.circleId === clickedCircleId)) {
          await takeStone(store.pieceSelected!, clickedCircleId)
        } else {
          await movePiece(store.pieceSelected!, clickedCircleId)
        }
      }
    }
    store.pieceSelected = null
  }
}
