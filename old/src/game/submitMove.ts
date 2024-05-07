import { store } from '../data/store'
import { Move } from '../types/gameTypes'
import { movePiece } from './movePiece'
import { takePiece } from './takePiece'
import { takeStone } from './takeStone'

export async function submitMove(move: Move) {
  const pieceToMove = store.gameStateHashTable[move.from.id].pieces![0].pieceId
  const destinationCircleId = move.to.id
  if (store.gameState!.stones.find(stone => stone.circleId === destinationCircleId)) {
    // move and take stone
    await takeStone(pieceToMove, destinationCircleId)
  } else {
    if (store.gameStateHashTable[destinationCircleId].pieces) {
      // move and take player piece
      const pieceId = store.gameStateHashTable[destinationCircleId].pieces![0].pieceId
      await takePiece(pieceToMove, destinationCircleId, pieceId)
    } else {
      // move only
      await movePiece(pieceToMove, destinationCircleId)
    }
  }
}
