import { store } from '../data/store'

export function getCircleFromPiece(pieceId: string) {
  for (const player of store.gameState!.players) {
    for (const position of player.positions) {
      if (position.pieceId === pieceId) {
        for (const circle of store.gameState!.map) {
          if (circle.id === position.circleId) {
            return circle
          }
        }
      }
    }
  }
  return null
}
