import { store } from '../data/store'
import { getPieceFromCircle } from '../utils/getPieceFromCircle'
import { getLegalMoves, getLegalStonePlacements } from './legalMoves'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { pieceBelongsToMe } from '../utils/pieceBelongsToMe'
import { placeStone } from './placeStone'
import { submitMove } from './submitMove'

export async function handleCircleClick(clickedCircleId: string) {
  if (store.waitingForServer) return

  // place stone
  if (store.gameState!.stones.find(stone => stone.circleId === null)) {
    const legalStonePlacements = getLegalStonePlacements()
    if (legalStonePlacements.map(circle => circle.id).includes(clickedCircleId)) {
      placeStone(clickedCircleId)
    }
    return
  }

  if (store.gameState!.dieRoll === null) return

  const pieceId = getPieceFromCircle(clickedCircleId)
  if (pieceBelongsToMe(pieceId)) {
    // select piece
    if (getLegalMoves(clickedCircleId).length > 0) {
      store.pieceSelected = pieceId
    }
  } else {
    // make move
    if (pieceBelongsToMe(store.pieceSelected)) {
      const circle = getCircleFromPiece(store.pieceSelected!)
      const legalMoves = getLegalMoves(circle!.id)
      if (legalMoves.map(circle => circle.id).includes(clickedCircleId)) {
        submitMove(store.pieceSelected!, clickedCircleId)
      }
    }
    store.pieceSelected = null
  }
}
