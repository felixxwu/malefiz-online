import { gameOver, gameState, lastDieRoll } from '../../../signals/signals'
import { activeItem } from '../../../signals/getters/activeItem'
import { getCircleFromPiece } from '../../../signals/queries/getCircleFromPiece'
import { getMyPlayer, getMyPlayerId } from '../../../signals/queries/getUsers'
import { getLegalMoves } from '../../../signals/queries/legalMoves'
import {
  dieNotRolled,
  gameNotStarted,
  myTurn,
  playerWhoIsPlaying,
  stoneInPit,
} from '../../../signals/getters'

export function getAction() {
  if (gameOver.value) return 'none' as const
  if (!gameState.value) return 'none' as const

  if (myTurn.value && activeItem.value) return 'itemaction' as const
  if (!myTurn.value && activeItem.value && playerWhoIsPlaying.value) {
    return 'pickedupmessage' as const
  }
  if (getMyPlayerId() && gameNotStarted.value) return 'startgame' as const
  if (stoneInPit.value && myTurn.value) return 'placestone' as const
  if (myTurn.value && dieNotRolled.value && lastDieRoll.value === 6) return 'rollagain' as const
  if (myTurn.value && dieNotRolled.value) return 'roll' as const

  if (myTurn.value && !dieNotRolled.value) {
    const myPieces = getMyPlayer()!.positions
    const myLegalMoves = myPieces
      .map(position => getLegalMoves(getCircleFromPiece(position.pieceId)!.id))
      .reduce((acc, val) => acc.concat(val), [])
    if (myLegalMoves.length > 0) {
      return 'yourturn' as const
    } else {
      return 'rollagainnolegal' as const
    }
  }

  if (!myTurn.value && playerWhoIsPlaying.value) return 'playerturn' as const

  return 'none' as const
}
