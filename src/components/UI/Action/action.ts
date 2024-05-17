import { gameOver, gameState, lastDieRoll } from '../../../signals/signals'
import { activeItem } from '../../../signals/getters/activeItem'
import { myPlayerId } from '../../../signals/getters/myPlayerId'
import {
  dieNotRolled,
  gameNotStarted,
  myTurn,
  playerWhoIsPlaying,
  stoneInPit,
} from '../../../signals/getters'
import { myLegalMoves } from '../../../signals/getters/myLegalMoves'
import { computed } from '@preact/signals'
import { ActionConfig } from '../../../items'
import { updateGame } from '../../../dbactions/updateGame'
import { playerDefs } from '../../../config/playerDefs'
import { rollDie } from '../../../dbactions/rollDie'

export const action = computed<Partial<ActionConfig> | null>(() => {
  if (gameOver.value) return null
  if (!gameState.value) return null

  if (activeItem.value) {
    if (myTurn.value) {
      return activeItem.value.actionWhenActive
    } else if (playerWhoIsPlaying.value) {
      return {
        text: `${playerWhoIsPlaying.value!.name} picked up ${activeItem.value!.name}`,
      }
    }
  }

  if (myPlayerId.value && gameNotStarted.value) {
    return {
      text: 'Start game',
      onClick: () => updateGame({ playerTurn: playerDefs[0].id }),
      clickable: true,
    }
  }

  if (stoneInPit.value && myTurn.value) {
    return {
      text: 'Place stone',
    }
  }

  if (myTurn.value && dieNotRolled.value) {
    if (lastDieRoll.value === 6) {
      return {
        text: 'Roll again',
        onClick: rollDie,
        clickable: true,
        showDie: true,
      }
    } else {
      return {
        text: 'Roll',
        onClick: rollDie,
        clickable: true,
        showDie: true,
      }
    }
  }

  if (myTurn.value && !dieNotRolled.value) {
    if (myLegalMoves.value.length > 0) {
      return {
        text: 'Your turn',
      }
    } else {
      return {
        text: 'Roll again (no legal moves)',
        onClick: rollDie,
        clickable: true,
        showDie: true,
      }
    }
  }

  if (!myTurn.value && playerWhoIsPlaying.value) {
    return {
      text: `${playerWhoIsPlaying.value!.name}'s turn`,
    }
  }

  return null
})
