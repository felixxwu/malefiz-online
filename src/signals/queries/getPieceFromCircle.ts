import { gameState } from '../signals'

export function getPieceFromCircle(circleId: string) {
  if (!gameState.value) return null

  for (const player of gameState.value!.players) {
    for (const position of player.positions.slice().reverse()) {
      if (position.circleId === circleId) {
        return position.pieceId
      }
    }
  }
  return null
}
