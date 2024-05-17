import { gameState } from '../signals'
import { myPlayerId } from '../getters/myPlayerId'

export function pieceBelongsToMe(pieceId: string | null) {
  if (pieceId === null) return false
  for (const player of gameState.value!.players) {
    for (const position of player.positions) {
      if (position.pieceId === pieceId) {
        return player.id === myPlayerId.value
      }
    }
  }
  return false
}
