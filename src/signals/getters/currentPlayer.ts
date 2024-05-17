import { computed } from '@preact/signals'
import { gameState } from '../signals'

export const currentPlayer = computed(() => {
  return gameState.value!.players.find(player => player.id === gameState.value!.playerTurn)!
})
