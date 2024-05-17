import { gameOver, gameState, lastDieRoll } from '../../../signals/signals'
import { activeItem } from '../../../signals/getters/activeItem'
import { getMyPlayerId } from '../../../signals/queries/getUsers'
import {
  dieNotRolled,
  gameNotStarted,
  myTurn,
  playerWhoIsPlaying,
  stoneInPit,
} from '../../../signals/getters'
import { myLegalMoves } from '../../../signals/getters/myLegalMoves'

export function getAction() {
  if (gameOver.value) return 'none' as const
  if (!gameState.value) return 'none' as const

  if (activeItem.value) {
    if (myTurn.value) {
      return 'itemaction' as const
    } else if (playerWhoIsPlaying.value) {
      return 'pickedupmessage' as const
    }
  }

  if (getMyPlayerId() && gameNotStarted.value) return 'startgame' as const
  if (stoneInPit.value && myTurn.value) return 'placestone' as const

  if (myTurn.value && dieNotRolled.value) {
    if (lastDieRoll.value === 6) {
      return 'rollagain' as const
    } else {
      return 'roll' as const
    }
  }

  if (myTurn.value && !dieNotRolled.value) {
    if (myLegalMoves.value.length > 0) {
      return 'yourturn' as const
    } else {
      return 'rollagainnolegal' as const
    }
  }

  if (!myTurn.value && playerWhoIsPlaying.value) return 'playerturn' as const

  return 'none' as const
}
