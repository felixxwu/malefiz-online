import { gameState } from '../signals'
import { getMyPlayerId } from './getUsers'

export function pieceBelongsToMe(pieceId: string | null) {
  if (pieceId === null) return false
  for (const player of gameState.value!.players) {
    for (const position of player.positions) {
      if (position.pieceId === pieceId) {
        return player.id === getMyPlayerId()
      }
    }
  }
  return false
}
