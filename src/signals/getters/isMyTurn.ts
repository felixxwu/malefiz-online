import { gameState } from '../signals'
import { getMyPlayerId } from '../queries/getUsers'

export function isMyTurn(): boolean {
  if (!gameState.value) return false
  if (!getMyPlayerId()) return false
  return gameState.value.playerTurn === getMyPlayerId()
}
