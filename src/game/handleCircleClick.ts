import { doc, runTransaction } from 'firebase/firestore'
import { GameState } from '../types/gameTypes'
import { db } from '../config/firebase'
import { store } from '../data/store'
import { getUserData } from '../data/userId'
import { getNextPlayer } from './playerTurns'
import { getPieceFromCircle } from '../utils/getPieceFromCircle'
import { getLegalMoves } from './legalMoves'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'
import { pieceBelongsToMe } from '../utils/pieceBelongsToMe'
import { sleep } from '../utils/sleep'
import { CONSTS } from '../data/consts'

export async function handleCircleClick(circleId: string) {
  const pieceId = getPieceFromCircle(circleId)
  if (pieceBelongsToMe(pieceId)) {
    // select piece
    store.pieceSelected = pieceId
  } else {
    // make move
    if (pieceBelongsToMe(store.pieceSelected)) {
      const circle = getCircleFromPiece(store.pieceSelected!)
      const legalMoves = getLegalMoves(circle!.id)
      if (legalMoves.map(circle => circle.id).includes(circleId)) {
        await movePiece(store.pieceSelected!, circleId)
      }
    }
    store.pieceSelected = null
  }
}

export async function movePiece(pieceId: string, circleId: string) {
  const newGameState = (gameState: GameState): Partial<GameState> => ({
    players: gameState.players.map(player => {
      if (store.gameState!.playerTurn === player.id) {
        return {
          ...player,
          positions: player.positions
            .filter(pos => pos.pieceId !== pieceId)
            .concat({ pieceId, circleId }),
        }
      } else {
        return player
      }
    }),
    playerTurn: getNextPlayer(),
  })

  if (store.localGame) {
    store.gameState = {
      ...store.gameState!,
      ...newGameState(store.gameState!),
    }
  } else {
    await runTransaction(db, async transaction => {
      const document = await transaction.get(doc(db, 'games', store.gameId!))
      const data = document.data() as GameState
      if (!data) return
      if (data.playerTurn !== getUserData().playerToControl) return
      transaction.update(doc(db, 'games', store.gameId!), newGameState(data))
    })
  }

  await sleep(CONSTS.PLAYER_TRANSITION)
}
