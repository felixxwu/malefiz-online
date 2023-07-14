import { store } from '../data/store'
import { movePiece } from '../game/handleCircleClick'
import { getLegalMoves } from '../game/legalMoves'
import { isMyTurn } from '../game/playerTurns'
import { sleep } from '../utils/sleep'

export async function playAiIfApplicable() {
  await sleep(1000)

  if (!store.localGame) return
  if (isMyTurn()) return

  const currentPlayer = store.gameState!.playerTurn
  const playerPieces = store.gameState!.players.find(
    player => player.id === currentPlayer
  )!.positions
  const randomPiece = playerPieces[Math.floor(Math.random() * playerPieces.length)]
  const legalMoves = getLegalMoves(randomPiece.circleId)
  const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)]
  movePiece(randomPiece.pieceId, randomMove.id)
}
