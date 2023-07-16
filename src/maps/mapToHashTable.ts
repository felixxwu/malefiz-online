import { GameState, Stone } from '../types/gameTypes'
import { Circle, Map } from '../types/mapTypes'

export function mapToHashTable(map: Map) {
  const hashTable: { [key: string]: Circle } = {}
  for (const circle of map) {
    if (hashTable[circle.id]) {
      throw new Error(`Duplicate circle id: ${circle.id}`)
    }
    hashTable[circle.id] = circle
  }
  return hashTable
}

export function stoneToHashTable(gameState: GameState) {
  const hashTable: { [circleId: string]: Stone } = {}
  for (const circle of gameState.map) {
    const stone = gameState.stones.find(stone => stone.circleId === circle.id)
    if (stone) {
      if (hashTable[circle.id]) {
        throw new Error(`Duplicate stone id: ${circle.id}`)
      }
      hashTable[`${circle.id}`] = stone
    }
  }
  const takenStone = gameState.stones.find(stone => stone.circleId === null)
  if (takenStone) hashTable['null'] = takenStone
  return hashTable
}
