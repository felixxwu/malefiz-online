import { store } from '../data/store'
import { Circle } from '../types/mapTypes'

export function getLegalMoves(circleId: string) {
  const circle = store.gameState!.map.find(circle => circle.id === circleId)!
  if (!store.gameState!.dieRoll) return []
  return findLegalMoves(circle, store.gameState!.dieRoll, [circle]).filter(c => !c.start)
}

export function getLegalStonePlacements() {
  const legalMoves: Circle[] = []
  for (const circleId in store.gameStateHashTable) {
    const position = store.gameStateHashTable[circleId]
    if (circleId === 'null') continue
    if (position.pieces) continue
    if (position.stone) continue
    if (position.circle!.finish) continue
    if (position.circle!.start) continue
    if (position.circle!.safeZone) continue

    legalMoves.push(position.circle!)
  }
  return legalMoves
}

function findLegalMoves(circle: Circle, movesLeft: number, visited: Circle[] = []) {
  const hashTable = store.gameStateHashTable
  const neighbours = circle.neighbours.map(neighborId => hashTable[neighborId].circle!)
  if (movesLeft === 0) return [circle]

  const legalMoves: Circle[] = []
  for (const neighbour of neighbours) {
    if (visited.map(c => c.id).includes(neighbour.id)) continue
    if (hashTable[neighbour.id].stone && movesLeft !== 1) continue
    legalMoves.push(...findLegalMoves(neighbour, movesLeft - 1, visited.concat(circle)))
  }
  return legalMoves
}
