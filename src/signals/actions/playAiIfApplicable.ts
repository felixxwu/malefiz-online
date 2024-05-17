import { gameState } from '../signals'
import { AI1, selectedBestPieceToMove } from '../getters/ai'
import { getLegalStonePlacements } from '../queries/legalMoves'
import { placeStone } from '../../dbactions/placeStone'
import { playerPiecesWithMoves } from '../queries/playerPiecesWithMoves'
import { rollDie } from '../../dbactions/rollDie'
import { submitMove } from '../../dbactions/submitMove'
import { getActiveItem } from '../getters/getActiveItem'
import { canAiPlay } from '../getters/canAiPlay'

export async function playAiIfApplicable() {
  if (!canAiPlay()) return

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

  const currentPlayer = gameState.value!.playerTurn
  const player = gameState.value!.players.find(player => player.id === currentPlayer)!
  const piecesWithLegalMoves = playerPiecesWithMoves(player)

  // re-roll if no legal moves
  if (piecesWithLegalMoves.length === 0) {
    rollDie()
    return
  }

  const bestMove = selectedBestPieceToMove(piecesWithLegalMoves)
  await submitMove(bestMove)
}
