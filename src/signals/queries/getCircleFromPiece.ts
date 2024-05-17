import { gameState, map } from '../signals'

export function getCircleFromPiece(pieceId: string) {
  for (const player of gameState.value!.players) {
    for (const position of player.positions) {
      if (position.pieceId === pieceId) {
        for (const circle of map.value) {
          if (circle.id === position.circleId) {
            return circle
          }
        }
      }
    }
  }
  return null
}
