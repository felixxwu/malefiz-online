import { gameState } from '../signals'
import { myPlayerId } from '../getters/myPlayerId'

export function getMyPlayer() {
  const gameStateValue = gameState.value
  if (!gameStateValue) return

  return gameStateValue.players.find(player => player.id === myPlayerId.value)
}
