import { gameState, userId } from '../signals'
import { UserID } from '../types/gameTypes'

export function getUsers() {
  const gameStateValue = gameState.value
  if (!gameStateValue) return []

  const userKeys = Object.keys(gameStateValue).filter(key => key.startsWith('user')) as UserID[]

  return userKeys.map(key => ({ ...gameStateValue[key], userId: key }))
}

export function getMyPlayerId() {
  const gameStateValue = gameState.value
  if (!gameStateValue) return

  return gameStateValue[`user${userId.value}`]?.playerToControl
}
