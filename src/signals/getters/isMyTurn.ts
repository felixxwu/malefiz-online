import { gameState } from '../signals'
import { myPlayerId } from './myPlayerId'

export function isMyTurn(): boolean {
  if (!gameState.value) return false
  if (!myPlayerId.value) return false
  return gameState.value.playerTurn === myPlayerId.value
}
