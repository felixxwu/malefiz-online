import { gameState, gameStateHashTable } from '../signals'
import { Move } from '../types/gameTypes'
import { movePiece } from './movePiece'
import { takePiece } from './takePiece'
import { takeStone } from './takeStone'

export async function submitMove(move: Move) {
  const pieceToMove = gameStateHashTable.value[move.from.id].pieces![0].pieceId
  const destinationCircleId = move.to.id
  if (gameState.value!.stones.find(stone => stone.circleId === destinationCircleId)) {
    // move and take stone
    await takeStone(pieceToMove, destinationCircleId)
  } else {
    if (gameStateHashTable.value[destinationCircleId].pieces) {
      // move and take player piece
      const pieceId = gameStateHashTable.value[destinationCircleId].pieces![0].pieceId
      await takePiece(pieceToMove, destinationCircleId, pieceId)
    } else {
      // move only
      await movePiece(pieceToMove, destinationCircleId)
    }
  }
}
