import { gameState } from '../signals/signals'

export function currentPlayer() {
  return gameState.value!.players.find(player => player.id === gameState.value!.playerTurn)!
}
