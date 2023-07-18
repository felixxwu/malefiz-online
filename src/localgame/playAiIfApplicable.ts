import { store } from '../data/store'
import { getLegalStonePlacements } from '../game/legalMoves'
import { sleep } from '../utils/sleep'
import { rollDie } from '../game/rollDie'
import { submitMove } from '../game/submitMove'
import { placeStone } from '../game/placeStone'
import { playerPiecesWithMoves } from '../game/playerPiecesWithMoves'
import { getUserData } from '../data/userId'
import { selectedBestPieceToMove } from './ai'

export async function playAiIfApplicable() {
  if (!canAiPlay()) return
  await sleep(1000)
  if (!canAiPlay()) return

  if (store.gameState!.dieRoll === null) {
    await rollDie()
    return
  }

  const currentPlayer = store.gameState!.playerTurn
  const player = store.gameState!.players.find(player => player.id === currentPlayer)!
  const piecesWithLegalMoves = playerPiecesWithMoves(player)

  // re-roll if no legal moves
  if (piecesWithLegalMoves.length === 0) {
    await rollDie()
    return
  }

  await sleep(1000)
  if (!canAiPlay()) return

  const { bestMove, piece } = selectedBestPieceToMove(piecesWithLegalMoves)

  await submitMove(piece.pieceId, bestMove.id)

  // place stone if taken
  if (store.gameState!.stones.some(stone => stone.circleId === null)) {
    await sleep(100)

    const legalStonePlacements = getLegalStonePlacements()
    const randomStonePlacement =
      legalStonePlacements[Math.floor(Math.random() * legalStonePlacements.length)]
    placeStone(randomStonePlacement.id)
  }
}

function canAiPlay() {
  if (!store.gameState) return false
  if (!getUserData() || !getUserData().isHost) return false
  const playerTurn = store.gameState.playerTurn
  const player = store.gameState.players.find(player => player.id === playerTurn)
  if (player?.isAI) return true
}
