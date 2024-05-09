import { gameState } from '../signals/signals'

export function getPieceFromCircle(circleId: string) {
  for (const player of gameState.value!.players) {
    for (const position of player.positions) {
      if (position.circleId === circleId) {
        return position.pieceId
      }
    }
  }
  return null
}
