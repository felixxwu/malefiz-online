import { gameOver, gameState } from '../signals'
import { getUserControllingPlayer } from '../queries/getUserControllingPlayer'
import { isUserHost } from './isUserHost'
import { computed } from '@preact/signals'

export const aiCanPlay = computed(() => {
  if (!gameState.value) return false
  if (!isUserHost()) return false
  if (gameOver.value) return false
  if (gameState.value.alert) return false

  const playerTurn = gameState.value.playerTurn
  const playerPlaying = gameState.value.players.find(player => player.id === playerTurn)
  if (playerPlaying && !getUserControllingPlayer(playerPlaying.id)) return true

  return false
})
