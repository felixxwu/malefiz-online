import { gameState, pieceSelected, waitingForServer } from '../../../signals'
import { getCircleFromPiece } from '../../../utils/getCircleFromPiece'
import { getPieceFromCircle } from '../../../utils/getPieceFromCircle'
import { getLegalMoves, getLegalStonePlacements } from '../../../utils/legalMoves'
import { pieceBelongsToMe } from '../../../utils/pieceBelongsToMe'

export async function handleCircleClick(clickedCircleId: string) {
  if (waitingForServer.value) return

  // place stone
  if (gameState.value!.stones.find(stone => stone.circleId === null)) {
    const legalStonePlacements = getLegalStonePlacements()
    if (legalStonePlacements.map(circle => circle.id).includes(clickedCircleId)) {
      console.log('place stone')
      // placeStone(clickedCircleId)
    }
    return
  }

  if (gameState.value!.dieRoll === null) return

  const pieceId = getPieceFromCircle(clickedCircleId)
  if (pieceBelongsToMe(pieceId)) {
    // select piece
    if (getLegalMoves(clickedCircleId).length > 0) {
      pieceSelected.value = pieceId
      console.log(`piece selected`, pieceId)
    }
  } else {
    // make move
    if (pieceBelongsToMe(pieceSelected.value)) {
      const circle = getCircleFromPiece(pieceSelected.value!)
      const legalMoves = getLegalMoves(circle!.id)
      const selectedMove = legalMoves.find(move => move.to.id === clickedCircleId)!
      console.log(`submitMove`, selectedMove)
      // submitMove(selectedMove)
    }
    pieceSelected.value = null
  }
}
