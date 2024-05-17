import { computed } from '@preact/signals'
import { getMyPlayerId } from '../queries/getUsers'
import { gameState } from '../signals'

export const myTurn = computed(() => gameState.value?.playerTurn === getMyPlayerId())
export const stoneInPit = computed(() =>
  gameState.value?.stones.find(stone => stone.circleId === null)
)
export const dieNotRolled = computed(() => gameState.value?.dieRoll === null)
export const playerWhoIsPlaying = computed(() =>
  gameState.value?.players.find(player => player.id === gameState.value!.playerTurn)
)
export const gameNotStarted = computed(() => gameState.value?.playerTurn === null)
