import { store } from '../data/store'
import { getPieceFromCircle } from '../utils/getPieceFromCircle'
import { getLegalMoves, getLegalStonePlacements } from './legalMoves'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { pieceBelongsToMe } from '../utils/pieceBelongsToMe'
import { movePiece } from './movePiece'
import { takeStone } from './takeStone'
import { placeStone } from './placeStone'
import { takePiece } from './takePiece'

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
    store.pieceSelected = pieceId
  } else {
    // make move
    if (pieceBelongsToMe(store.pieceSelected)) {
      const circle = getCircleFromPiece(store.pieceSelected!)
      const legalMoves = getLegalMoves(circle!.id)
      if (legalMoves.map(circle => circle.id).includes(clickedCircleId)) {
        if (store.gameState!.stones.find(stone => stone.circleId === clickedCircleId)) {
          // move and take stone
          await takeStone(store.pieceSelected!, clickedCircleId)
        } else {
          if (store.gameStateHashTable[clickedCircleId].pieces) {
            // move and take player piece
            const pieceId = store.gameStateHashTable[clickedCircleId].pieces![0].pieceId
            await takePiece(store.pieceSelected!, clickedCircleId, pieceId)
          } else {
            // move only
            await movePiece(store.pieceSelected!, clickedCircleId)
          }
        }
      }
    }
    store.pieceSelected = null
  }
}
