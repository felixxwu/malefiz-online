import { store } from '../data/store'
import { Circle } from '../types/mapTypes'

export function getLegalMoves(circleId: string) {
  const circle = store.gameState!.map.find(circle => circle.id === circleId)!
  if (!store.gameState!.dieRoll) return []
  return findLegalMoves(circle, store.gameState!.dieRoll, [circle])
}

function findLegalMoves(circle: Circle, movesLeft: number, visited: Circle[] = []) {
  const hashTableMap = store.gameStateMapHashed
  const neighbours = circle.neighbours.map(neighborId => hashTableMap[neighborId])
  if (movesLeft === 0) return [circle]

  const legalMoves: Circle[] = []
  for (const neighbour of neighbours) {
    if (visited.map(c => c.id).includes(neighbour.id)) continue
    legalMoves.push(...findLegalMoves(neighbour, movesLeft - 1, visited.concat(circle)))
  }
  return legalMoves
}