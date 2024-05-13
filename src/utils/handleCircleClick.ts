import { gameState, gameStateHashTable, pieceSelected, waitingForServer } from '../signals/signals'
import { getCircleFromPiece } from './getCircleFromPiece'
import { getPieceFromCircle } from './getPieceFromCircle'
import { getLegalMoves, getLegalStonePlacements } from './legalMoves'
import { pieceBelongsToMe } from './pieceBelongsToMe'
import { placeStone } from '../dbactions/placeStone'
import { submitMove } from '../dbactions/submitMove'

export async function handleCircleClick(clickedCircleId: string) {
  if (waitingForServer.value) return
  const circle = gameStateHashTable.value[clickedCircleId]?.circle
  if (!circle) return
  if (circle?.custom) return

  // place stone
  if (gameState.value!.stones.find(stone => stone.circleId === null)) {
    const legalStonePlacements = getLegalStonePlacements()
    if (legalStonePlacements.map(circle => circle.id).includes(clickedCircleId)) {
      placeStone(clickedCircleId)
    }
    return
  }

  if (gameState.value!.dieRoll === null) return

  const pieceId = getPieceFromCircle(clickedCircleId)
  if (pieceBelongsToMe(pieceId)) {
    // select piece
    if (getLegalMoves(clickedCircleId).length > 0) {
      pieceSelected.value = pieceId
    }
  } else {
    // make move
    if (pieceBelongsToMe(pieceSelected.value)) {
      const circle = getCircleFromPiece(pieceSelected.value!)
      const legalMoves = getLegalMoves(circle!.id)
      const selectedMove = legalMoves.find(move => move.to.id === clickedCircleId)!
      submitMove(selectedMove)
    }
    pieceSelected.value = null
  }
}
