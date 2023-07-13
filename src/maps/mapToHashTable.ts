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
