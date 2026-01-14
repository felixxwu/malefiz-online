import { gameStateHashTable } from '../signals/getters/gameStateHashTable'

/**
 * Calculates the shortest path distance between two circles on the map.
 * Uses BFS to find the minimum number of steps.
 */
export function getPathDistance(fromCircleId: string, toCircleId: string): number {
  if (fromCircleId === toCircleId) return 0

  const hashTable = gameStateHashTable.value
  const queue: { circleId: string; distance: number }[] = [{ circleId: fromCircleId, distance: 0 }]
  const visited = new Set<string>()

  while (queue.length > 0) {
    const { circleId, distance } = queue.shift()!

    if (visited.has(circleId)) continue
    visited.add(circleId)

    if (circleId === toCircleId) {
      return distance
    }

    const circle = hashTable[circleId]?.circle
    if (!circle) continue

    for (const neighbourId of circle.neighbours) {
      if (!visited.has(neighbourId)) {
        queue.push({ circleId: neighbourId, distance: distance + 1 })
      }
    }
  }

  // If no path found, return 0 (shouldn't happen in a valid game)
  return 0
}
