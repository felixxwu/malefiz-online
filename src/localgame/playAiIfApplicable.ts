import { store } from '../data/store'
import { getLegalStonePlacements } from '../game/legalMoves'
import { sleep } from '../utils/sleep'
import { rollDie } from '../game/rollDie'
import { submitMove } from '../game/submitMove'
import { placeStone } from '../game/placeStone'
import { playerPiecesWithMoves } from '../game/playerPiecesWithMoves'
import { getUserData } from '../data/userId'
import { createAI, selectedBestPieceToMove } from './ai'

let aiPlaying = false

export async function playAiIfApplicable() {
  if (!canAiPlay()) return
  if (aiPlaying) return
  aiPlaying = true
  await sleep(1500)

  if (store.gameState!.dieRoll === null) {
    aiPlaying = false
    if (!canAiPlay()) return
    await rollDie()
    return
  }

  const currentPlayer = store.gameState!.playerTurn
  const player = store.gameState!.players.find(player => player.id === currentPlayer)!
  const piecesWithLegalMoves = playerPiecesWithMoves(player)

  // re-roll if no legal moves
  if (piecesWithLegalMoves.length === 0) {
    aiPlaying = false
    if (!canAiPlay()) return
    await rollDie()
    return
  }

  const bestMove = selectedBestPieceToMove(piecesWithLegalMoves)

  aiPlaying = false
  if (!canAiPlay()) return
  await submitMove(bestMove)

  // place stone if taken
  if (store.gameState!.stones.some(stone => stone.circleId === null)) {
    await sleep(100)

    const legalStonePlacements = getLegalStonePlacements()
    const AI = createAI({
      forwardPriority: 0.1,
      stonePriority: 2,
      killPriority: 1,
      stoneLookahead: 5,
      stoneForwardPriority: 0.03,
      ditherRange: 0.1,
    })
    const placement = AI.getBestStonePlacement(legalStonePlacements)
    placeStone(placement.id)
  }
}

function canAiPlay() {
  if (!store.gameState) return false
  if (!getUserData() || !getUserData().isHost) return false
  const playerTurn = store.gameState.playerTurn
  const player = store.gameState.players.find(player => player.id === playerTurn)
  if (player?.isAI) return true
  return false
}
