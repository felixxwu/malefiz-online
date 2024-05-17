import { gameState } from '../signals'

export function getUserFromGameState(userId: string) {
  const gameStateValue = gameState.value
  if (!gameStateValue) return

  return gameStateValue[`user${userId}`]
}
