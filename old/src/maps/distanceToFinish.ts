import { store } from '../data/store'
import { HashTable } from './mapToHashTable'

export function addDistancesToFinish(hashTable: HashTable) {
  const finishCircle = store.gameState!.map.find(circle => circle.finish)!
  addToHashTable(hashTable, finishCircle.id, 0, [finishCircle.id])
}

function addToHashTable(
  hashTable: HashTable,
  circleId: string,
  distance: number,
  visited: string[]
) {
  if (hashTable[circleId].distanceToFinish !== undefined) {
    if (hashTable[circleId].distanceToFinish! > distance) {
      hashTable[circleId].distanceToFinish = distance
    } else {
      return
    }
  } else {
    hashTable[circleId].distanceToFinish = distance
  }

  const circle = hashTable[circleId].circle!
  const isStone = !!hashTable[circleId].stone
  for (const neighbourId of circle.neighbours) {
    if (visited.includes(neighbourId)) continue
    addToHashTable(hashTable, neighbourId, distance + (isStone ? 6 : 1), [...visited, neighbourId])
  }
}
