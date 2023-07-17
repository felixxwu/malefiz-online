import { store } from '../data/store'
import { getLegalStonePlacements } from '../game/legalMoves'
import { isMyTurn } from '../game/playerTurns'
import { sleep } from '../utils/sleep'
import { rollDie } from '../game/rollDie'
import { submitMove } from '../game/submitMove'
import { placeStone } from '../game/placeStone'
import { playerPiecesWithMoves } from '../game/playerPiecesWithMoves'

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

  const randomPiece = piecesWithLegalMoves[Math.floor(Math.random() * piecesWithLegalMoves.length)]
  const legalMoves = randomPiece.moves
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
  await submitMove(randomPiece.pieceId, randomMove.id)

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
  return store.localGame && !isMyTurn()
}
