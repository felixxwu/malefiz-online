import { store } from '../data/store'
import { movePiece } from '../game/movePiece'
import { getLegalMoves } from '../game/legalMoves'
import { isMyTurn } from '../game/playerTurns'
import { sleep } from '../utils/sleep'
import { rollDie } from '../game/rollDie'

export async function playAiIfApplicable() {
  if (!canAiPlay()) return
  await sleep(1000)
  if (!canAiPlay()) return

  if (store.gameState!.dieRoll === null) {
    await rollDie()
    return
  }

  await sleep(1000)
  if (!canAiPlay()) return

  const currentPlayer = store.gameState!.playerTurn
  const playerPieces = store.gameState!.players.find(
    player => player.id === currentPlayer
  )!.positions
  const randomPiece = playerPieces[Math.floor(Math.random() * playerPieces.length)]
  const legalMoves = getLegalMoves(randomPiece.circleId)
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
  movePiece(randomPiece.pieceId, randomMove.id)
}

function canAiPlay() {
  return store.localGame && !isMyTurn()
}
