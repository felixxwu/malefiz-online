import { gameState, userId } from '../signals/signals'
import { UserID } from '../types/gameTypes'

export function getUsers() {
  const gameStateValue = gameState.value
  if (!gameStateValue) return []

  const userKeys = Object.keys(gameStateValue).filter(key => key.startsWith('user')) as UserID[]

  return userKeys.map(key => ({ ...gameStateValue[key], userId: key }))
}

export function getUserFromGameState(userId: string) {
  const gameStateValue = gameState.value
  if (!gameStateValue) return

  return gameStateValue[`user${userId}`]
}

export function getMyPlayerId() {
  return getUserFromGameState(userId.value)?.playerToControl
}

export function getMyPlayer() {
  const gameStateValue = gameState.value
  if (!gameStateValue) return

  return gameStateValue.players.find(player => player.id === getMyPlayerId())
}
