import { gameState } from '../signals'

export function currentPlayer() {
  return gameState.value!.players.find(player => player.id === gameState.value!.playerTurn)!
}
