import { store } from '../data/store'

export function getNextPlayer(): string {
  if (!store.gameState) return '1'
  const currentPlayer = store.gameState.playerTurn
  const currentPlayerIndex = store.gameState.players.findIndex(
    player => player.id === currentPlayer
  )
  const nextPlayerIndex = (currentPlayerIndex + 1) % store.gameState.players.length
  return store.gameState.players[nextPlayerIndex].id!
}
