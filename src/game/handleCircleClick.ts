import { doc, runTransaction } from 'firebase/firestore'
import { GameState } from '../types/gameTypes'
import { db } from '../config/firebase'
import { store } from '../data/store'
import { getUserData } from '../data/userId'
import { getNextPlayer } from './playerTurns'
import { getPieceFromCircle } from '../utils/getPieceFromCircle'
import { getLegalMoves } from './legalMoves'
import { getCircleFromPiece } from '../utils/getCircleFromPiece'

export async function handleCircleClick(circleId: string) {
  if (store.gameId === null) return

  const pieceId = getPieceFromCircle(circleId)
  if (pieceId === null) {
    // make move
    if (pieceBelongsToMe(store.pieceSelected)) {
      const circle = getCircleFromPiece(store.pieceSelected!)
      const legalMoves = getLegalMoves(circle!.id)
      if (legalMoves.map(circle => circle.id).includes(circleId)) {
        await movePiece(store.pieceSelected!, circleId)
      }
    }
    store.pieceSelected = null
  } else {
    // select piece
    store.pieceSelected = pieceId
  }
}

async function movePiece(pieceId: string, circleId: string) {
  await runTransaction(db, async transaction => {
    const document = await transaction.get(doc(db, 'games', store.gameId!))
    const data = document.data() as GameState
    if (!data) return
    if (data.playerTurn !== getUserData().playerToControl) return
    const newGameStatePlayers: Partial<GameState> = {
      players: data.players.map(player => {
        if (getUserData().playerToControl === player.id) {
          return {
            ...player,
            positions: player.positions
              .filter(p => p.pieceId !== pieceId)
              .concat({ pieceId, circleId }),
          }
        } else {
          return player
        }
      }),
      playerTurn: getNextPlayer(),
    }
    transaction.update(doc(db, 'games', store.gameId!), newGameStatePlayers)
  })
}

function pieceBelongsToMe(pieceId: string | null) {
  if (pieceId === null) return false
  for (const player of store.gameState!.players) {
    for (const position of player.positions) {
      if (position.pieceId === pieceId) {
        return player.id === getUserData().playerToControl
      }
    }
  }
  return false
}
