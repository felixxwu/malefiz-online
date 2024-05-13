import { gameState, gameStateHashTable } from '../signals/signals'
import { Move } from '../types/gameTypes'
import { objectToArray } from '../utils/objectToArray'
import { movePiece } from './movePiece'
import { takeItem } from './takeItem'
import { takePiece } from './takePiece'
import { takeStone } from './takeStone'

export async function submitMove(move: Move) {
  if (!move) return
  const pieceToMove = gameStateHashTable.value[move.from.id].pieces![0].pieceId
  const destinationCircleId = move.to.id

  if (gameState.value!.stones.find(stone => stone.circleId === destinationCircleId)) {
    // move and take stone
    return await takeStone(pieceToMove, destinationCircleId)
  }

  if (gameStateHashTable.value[destinationCircleId].pieces) {
    // move and take player piece
    const pieceId = gameStateHashTable.value[destinationCircleId].pieces![0].pieceId
    return await takePiece(pieceToMove, destinationCircleId, pieceId)
  }

  const itemAtDestination = objectToArray(gameState.value!.items).find(item =>
    item.value.positions.find(pos => pos.circleId === destinationCircleId)
  )
  if (itemAtDestination) {
    // move and take item
    return await takeItem(itemAtDestination.key, pieceToMove, destinationCircleId)
  }

  // move only
  await movePiece(pieceToMove, destinationCircleId)
}
