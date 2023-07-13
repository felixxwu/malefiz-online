import { store } from '../data/store'

export function getPieceFromCircle(circleId: string) {
  for (const player of store.gameState!.players) {
    for (const position of player.positions) {
      if (position.circleId === circleId) {
        return position.pieceId
      }
    }
  }
  return null
}
