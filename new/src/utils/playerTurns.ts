import { players } from './parseMap'
import { gameState } from '../signals/signals'
import { getMyPlayerId } from './getUsers'

export function getNextPlayer(): string {
  if (!gameState.value) return players[0].id
  const currentPlayer = gameState.value.playerTurn
  const currentPlayerIndex = gameState.value.players.findIndex(
    player => player.id === currentPlayer
  )
  const nextPlayerIndex = (currentPlayerIndex + 1) % gameState.value.players.length
  return gameState.value.players[nextPlayerIndex].id!
}

export function isMyTurn(): boolean {
  if (!gameState.value) return false
  if (!getMyPlayerId()) return false
  return gameState.value.playerTurn === getMyPlayerId()
}
