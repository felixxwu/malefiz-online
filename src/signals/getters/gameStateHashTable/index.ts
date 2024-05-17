import { computed } from '@preact/signals'
import { HashTable, mapToHashTable } from './mapToHashTable'
import { gameState } from '../../signals'

export const gameStateHashTable = computed<HashTable>(() => {
  return gameState.value ? mapToHashTable(gameState.value) : {}
})
