import { gameState } from '../signals'
import { AI1, selectedBestPieceToMove } from '../getters/ai'
import { getLegalStonePlacements } from '../queries/legalMoves'
import { placeStone } from '../../dbactions/placeStone'
import { playerPiecesWithMoves } from '../queries/playerPiecesWithMoves'
import { rollDie } from '../../dbactions/rollDie'
import { submitMove } from '../../dbactions/submitMove'
import { getActiveItem } from '../getters/getActiveItem'
import { aiCanPlay } from '../getters/aiCanPlay'
import { currentPlayer } from '../getters/currentPlayer'

export async function playAiIfApplicable() {
  if (!aiCanPlay.value) return

  const activeItem = getActiveItem()
  if (activeItem) {
    activeItem.aiAction()
    return
  }

  // place stone if taken
  if (gameState.value!.stones.some(stone => stone.circleId === null)) {
    const legalStonePlacements = getLegalStonePlacements()
    const placement = AI1.getBestStonePlacement(legalStonePlacements)
    placeStone(placement.id)
    return
  }

  if (gameState.value!.dieRoll === null) {
    rollDie()
    return
  }

  const piecesWithLegalMoves = playerPiecesWithMoves(currentPlayer.value)

  // re-roll if no legal moves
  if (piecesWithLegalMoves.length === 0) {
    rollDie()
    return
  }

  const bestMove = selectedBestPieceToMove(piecesWithLegalMoves)
  await submitMove(bestMove)
}
