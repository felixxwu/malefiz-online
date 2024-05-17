import { gameState, playerModel, userId } from '../signals/signals'
import { UserID } from '../types/gameTypes'
import { gameId } from '../signals/getters/gameId'
import { updateGameNested } from './updateGame'

export function updatePlayerModelMidGame() {
  if (!gameId) return null
  if (!gameState.value) return null

  const userKey: UserID = `user${userId.value}`
  updateGameNested({
    [`${userKey}.playerModel`]: playerModel.value,
  })
}
