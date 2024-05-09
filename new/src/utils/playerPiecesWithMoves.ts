import { Player } from '../types/gameTypes'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { getLegalMoves } from './legalMoves'

export function playerPiecesWithMoves(player: Player) {
  return player.positions
    .map(pos => ({
      ...pos,
      moves: getLegalMoves(getCircleFromPiece(pos.pieceId)!.id),
    }))
    .filter(pos => pos.moves.length > 0)
}
