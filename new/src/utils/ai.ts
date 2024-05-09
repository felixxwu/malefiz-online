import { gameState, gameStateHashTable } from '../signals/signals'
import { Move } from '../types/gameTypes'
import { Circle } from '../types/mapTypes'

export const AI1 = createAI({
  forwardPriority: 0.08,
  stonePriority: 1,
  killPriority: 3,
  stoneLookahead: 5,
  stoneForwardPriority: 0.1,
  ditherRange: 0.05,
})

export function selectedBestPieceToMove(
  pieces: { moves: Move[]; pieceId: string; circleId: string }[]
) {
  const bestMoves = pieces.map(piece => ({ move: AI1.selectMove(piece.moves), piece }))
  const bestBestMove = AI1.selectMove(bestMoves.map(bestMove => bestMove.move))
  return bestBestMove
}

function createAI({
  stonePriority,
  killPriority,
  forwardPriority,
  stoneLookahead,
  stoneForwardPriority,
  ditherRange,
}: {
  stonePriority: number // add to score if stone taken
  killPriority: number // add to score if kill
  forwardPriority: number // add to score for every step forward
  stoneLookahead: number // how many stones in front of a player before it stops counting
  stoneForwardPriority: number // add to score for every step forward a stone is
  ditherRange: number // small dither to choose randomly between equally scored moves
}) {
  return {
    selectMove(legalMoves: Move[]): Move {
      let bestMove = legalMoves[0]
      for (const move of legalMoves) {
        if (this.getMoveScore(move) > this.getMoveScore(bestMove)) {
          bestMove = move
        }
      }

      return bestMove
    },
    getMoveScore(move: Move) {
      let score = 0
      const from = gameStateHashTable.value![move.from.id]
      const to = gameStateHashTable.value![move.to.id]

      const moveFromDistance = from.distanceToFinish!
      const moveToDistance = to.distanceToFinish!
      const distanceCovered = moveFromDistance - moveToDistance
      score += distanceCovered

      const forwardPiecePriority = moveFromDistance * -forwardPriority
      score += forwardPiecePriority

      const stoneTaken = !!to.stone
      if (stoneTaken) score += stonePriority

      const playerTaken = !!to.pieces
      if (playerTaken) score += killPriority

      const finishReached = to.circle!.finish
      if (finishReached) score += 1000000000

      const dither = Math.random() * ditherRange

      return score + dither
    },
    getBestStonePlacement(legalStonePlacements: Circle[]) {
      let bestStonePlacement = legalStonePlacements[0]
      for (const stonePlacement of legalStonePlacements) {
        if (
          this.getStonePlacementScore(stonePlacement) >
          this.getStonePlacementScore(bestStonePlacement)
        ) {
          bestStonePlacement = stonePlacement
        }
      }

      return bestStonePlacement
    },
    getStonePlacementScore(circle: Circle) {
      const distanceToFinish = gameStateHashTable.value[circle.id].distanceToFinish!
      const proximity = this.proximityToPlayer(circle, stoneLookahead)
      const dither = Math.random() * ditherRange
      return proximity + dither - distanceToFinish * stoneForwardPriority
    },
    proximityToPlayer(circle: Circle, maxDepth: number): number {
      const hashTable = gameStateHashTable.value
      const neighbours = circle.neighbours.map(neighborId => hashTable[neighborId].circle!)
      if (maxDepth === 0) return 0

      const neighbourFurtherFromFinish = neighbours.reduce(
        (acc, neighbour) =>
          hashTable[neighbour.id].distanceToFinish! > hashTable[acc.id].distanceToFinish!
            ? neighbour
            : acc,
        neighbours[0]
      )

      // don't block self
      if (
        hashTable[neighbourFurtherFromFinish.id].pieces &&
        hashTable[neighbourFurtherFromFinish.id].pieces!.some(
          p => p.playerId === gameState.value!.playerTurn
        )
      ) {
        return 0
      }

      if (
        hashTable[neighbourFurtherFromFinish.id].pieces &&
        hashTable[neighbourFurtherFromFinish.id].pieces!.some(
          p => p.playerId !== gameState.value!.playerTurn
        )
      ) {
        return stoneLookahead
      } else {
        return Math.max(this.proximityToPlayer(neighbourFurtherFromFinish, maxDepth - 1) - 1, 0)
      }
    },
  }
}
