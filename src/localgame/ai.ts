import { store } from '../data/store'
import { Circle } from '../types/mapTypes'

export function selectedBestPieceToMove(
  pieces: { moves: Circle[]; pieceId: string; circleId: string }[]
) {
  const bestMoves = pieces.map(piece => ({ move: selectMove(piece.moves), piece }))
  const bestBestMove = selectMove(bestMoves.map(bestMove => bestMove.move))
  return {
    bestMove: bestBestMove,
    piece: bestMoves.find(bestMove => bestMove.move === bestBestMove)!.piece,
  }
}

export function selectMove(legalMoves: Circle[]) {
  const legalMovesFromHashTable = legalMoves.map(move => store.gameStateHashTable![move.id])
  const moveWithShortestDistanceToFinish = legalMovesFromHashTable.reduce((bestMove, move) => {
    return bestMove.distanceToFinish! < move.distanceToFinish! ? bestMove : move
  }, legalMovesFromHashTable[0])

  return store.gameStateHashTable![moveWithShortestDistanceToFinish.circle!.id].circle!
}
