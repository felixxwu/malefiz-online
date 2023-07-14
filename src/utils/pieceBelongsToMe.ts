import { store } from '../data/store'
import { getUserData } from '../data/userId'

export function pieceBelongsToMe(pieceId: string | null) {
  if (pieceId === null) return false
  for (const player of store.gameState!.players) {
    for (const position of player.positions) {
      if (position.pieceId === pieceId) {
        return player.id === getUserData().playerToControl
      }
    }
  }
  return false
}
