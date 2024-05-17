import { playerDefs } from '../../config/playerDefs'
import { gameState } from '../signals'

export function getNextPlayer(): string {
  if (!gameState.value) return playerDefs[0].id
  const currentPlayerId = gameState.value.playerTurn
  const currentPlayerIndex = gameState.value.players.findIndex(
    player => player.id === currentPlayerId
  )
  const nextPlayerIndex = (currentPlayerIndex + 1) % gameState.value.players.length
  return gameState.value.players[nextPlayerIndex].id!
}
