import { computed } from '@preact/signals'
import { HashTable, mapToHashTable } from '../../utils/mapToHashTable'
import { getMyPlayerId } from '../queries/getUsers'
import { gameState } from '../signals'

export const gameStateHashTable = computed<HashTable>(() => {
  return gameState.value ? mapToHashTable(gameState.value) : {}
})

export const myTurn = computed(() => gameState.value?.playerTurn === getMyPlayerId())
export const stonePit = computed(() =>
  gameState.value?.stones.find(stone => stone.circleId === null)
)
export const dieNotRolled = computed(() => gameState.value?.dieRoll === null)
export const playerWhoIsPlaying = computed(() =>
  gameState.value?.players.find(player => player.id === gameState.value!.playerTurn)
)

// const stoneInPit = gameState.value.stones.find(stone => stone.circleId === null)
// const gameNotStarted = gameState.value.playerTurn === null
// const dieNotRolled = gameState.value.dieRoll === null
// const playerWhoIsPlaying = gameState.value.players.find(
//   player => player.id === gameState.value!.playerTurn
// )
// const activeItem = getActiveItem()
