import { store } from '../data/store'
import { Move } from '../types/gameTypes'

export function selectedBestPieceToMove(
  pieces: { moves: Move[]; pieceId: string; circleId: string }[]
) {
  const bestMoves = pieces.map(piece => ({ move: selectMove(piece.moves), piece }))
  const bestBestMove = selectMove(bestMoves.map(bestMove => bestMove.move))
  return bestBestMove
}

export function selectMove(legalMoves: Move[]): Move {
  let bestMove = legalMoves[0]
  for (const move of legalMoves) {
    if (getMoveScore(move) > getMoveScore(bestMove)) {
      bestMove = move
    }
  }

  return bestMove
}

function getMoveScore(move: Move) {
  let score = 0
  const from = store.gameStateHashTable![move.from.id]
  const to = store.gameStateHashTable![move.to.id]

  const moveFromDistance = from.distanceToFinish!
  const moveToDistance = to.distanceToFinish!
  const distanceCovered = moveFromDistance - moveToDistance
  score += distanceCovered

  const forwardPiecePriority = moveFromDistance * (-1 / 3)
  score += forwardPiecePriority

  const stoneTaken = !!to.stone
  if (stoneTaken) score += 3

  const playerTaken = !!to.pieces
  if (playerTaken) score += 2

  const finishReached = to.circle!.finish
  if (finishReached) score += 1000000

  return score
}
