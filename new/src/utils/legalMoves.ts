import { gameState, gameStateHashTable } from '../signals'
import { Move } from '../types/gameTypes'
import { Circle } from '../types/mapTypes'

export function getLegalMoves(targetCircleId: string): Move[] {
  const position = gameStateHashTable.value[targetCircleId]!
  if (!gameState.value!.dieRoll) return []
  return findLegalMoves(position.circle!, gameState.value!.dieRoll, [position.circle!])
    .filter(
      c =>
        !c.start &&
        !gameStateHashTable.value[c.id].pieces?.some(
          p => p.playerId === gameState.value!.playerTurn
        )
    )
    .map(c => ({ from: position.circle!, to: c }))
}

export function getLegalStonePlacements() {
  const legalMoves: Circle[] = []
  for (const circleId in gameStateHashTable.value) {
    const position = gameStateHashTable.value[circleId]
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
  const hashTable = gameStateHashTable.value
  const neighbours = circle.neighbours.map(neighborId => hashTable[neighborId].circle!)
  if (movesLeft === 0) return [circle]

  const legalMoves: Circle[] = []
  for (const neighbour of neighbours) {
    if (visited.map(c => c.id).includes(neighbour.id)) continue
    if (hashTable[neighbour.id].stone && movesLeft !== 1) continue
    if (
      hashTable[neighbour.id].pieces &&
      hashTable[neighbour.id].circle?.safeZone &&
      movesLeft === 1
    ) {
      continue
    }

    legalMoves.push(...findLegalMoves(neighbour, movesLeft - 1, visited.concat(circle)))
  }
  return legalMoves
}
