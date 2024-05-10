import { gameState, playerModel, userId } from '../signals/signals'
import { UserID } from '../types/gameTypes'
import { gameId } from './gameId'
import { updateGame } from './updateGame'

export function updatePlayerModelMidGame() {
  if (!gameId) return null
  if (!gameState.value) return null

  const userKey: UserID = `user${userId.value}`
  updateGame({
    [userKey]: {
      ...(gameState.value[userKey] || {}),
      playerModel: playerModel.value,
    },
  })
}