import { computed } from '@preact/signals'
import { myPlayerId } from './myPlayerId'
import { gameState } from '../signals'

export const myTurn = computed(() => gameState.value?.playerTurn === myPlayerId.value)
export const stoneInPit = computed(() =>
  gameState.value?.stones.find(stone => stone.circleId === null)
)
export const dieNotRolled = computed(() => gameState.value?.dieRoll === null)
export const playerWhoIsPlaying = computed(() =>
  gameState.value?.players.find(player => player.id === gameState.value!.playerTurn)
)
export const gameNotStarted = computed(() => gameState.value?.playerTurn === null)
